
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "@/services/api";
import { Product } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useStore } from "@/context/StoreContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");
  const { addItemToCart, cart } = useStore();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const productData = await getProductById(id);
        
        if (productData) {
          setProduct(productData);
          setSelectedImage(productData.images[0]);
          // Set default selections
          if (productData.sizes.length > 0) {
            setSelectedSize(productData.sizes[0]);
          }
          if (productData.colors.length > 0) {
            setSelectedColor(productData.colors[0]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product || !selectedSize || !selectedColor) return;

    await addItemToCart(product, quantity, selectedSize, selectedColor);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar cartItems={cart} />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/2">
                <div className="bg-gray-200 h-96 rounded-md"></div>
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                <div className="h-24 bg-gray-200 rounded"></div>
                <div className="h-10 bg-gray-200 rounded w-1/2"></div>
                <div className="h-10 bg-gray-200 rounded w-1/2"></div>
                <div className="h-12 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar cartItems={cart} />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="mb-8">Sorry, the product you are looking for does not exist.</p>
            <Button asChild>
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar cartItems={cart} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm">
          <Link to="/" className="text-gray-500 hover:text-shop-accent">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="text-gray-500 hover:text-shop-accent">Products</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="overflow-hidden rounded-lg bg-shop-secondary">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-auto object-contain aspect-square"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={`w-20 h-20 rounded border overflow-hidden ${
                    selectedImage === image
                      ? "border-shop-accent ring-2 ring-shop-accent/30"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} - View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold text-shop-primary mb-2">{product.name}</h1>
            
            {/* Price */}
            <div className="mb-4">
              {product.discountedPrice ? (
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-shop-accent mr-3">
                    ${product.discountedPrice.toFixed(2)}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
              )}
            </div>
            
            {/* Description */}
            <p className="text-gray-600 mb-6">{product.description}</p>
            
            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Size</h3>
              <RadioGroup
                value={selectedSize}
                onValueChange={setSelectedSize}
                className="flex flex-wrap gap-2"
              >
                {product.sizes.map((size) => (
                  <div key={size} className="flex items-center">
                    <RadioGroupItem
                      value={size}
                      id={`size-${size}`}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={`size-${size}`}
                      className="px-4 py-2 border rounded-md cursor-pointer transition-colors peer-data-[state=checked]:bg-shop-accent peer-data-[state=checked]:text-white peer-data-[state=checked]:border-shop-accent hover:bg-gray-100 peer-data-[state=checked]:hover:bg-shop-accent"
                    >
                      {size}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Color</h3>
              <RadioGroup
                value={selectedColor}
                onValueChange={setSelectedColor}
                className="flex flex-wrap gap-2"
              >
                {product.colors.map((color) => (
                  <div key={color} className="flex items-center">
                    <RadioGroupItem
                      value={color}
                      id={`color-${color}`}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={`color-${color}`}
                      className="px-4 py-2 border rounded-md cursor-pointer transition-colors peer-data-[state=checked]:bg-shop-accent peer-data-[state=checked]:text-white peer-data-[state=checked]:border-shop-accent hover:bg-gray-100 peer-data-[state=checked]:hover:bg-shop-accent capitalize"
                    >
                      {color}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            {/* Quantity */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Quantity</h3>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="mx-4 text-lg font-medium w-8 text-center">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>
            
            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              className="w-full bg-shop-accent hover:bg-shop-accent/90 mb-6"
              size="lg"
              disabled={!selectedSize || !selectedColor}
            >
              Add to Cart
            </Button>
            
            {/* Additional Info Tabs */}
            <Tabs defaultValue="details">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
                <TabsTrigger value="returns">Returns</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="pt-4">
                <p className="text-sm text-gray-600">
                  Our {product.name} is crafted with high-quality materials to ensure comfort and durability. 
                  Perfect for everyday wear, this item is designed to match with various outfits in your wardrobe.
                </p>
              </TabsContent>
              <TabsContent value="shipping" className="pt-4">
                <p className="text-sm text-gray-600">
                  Free shipping on all orders over $50. Standard delivery takes 3-5 business days.
                  Express shipping options are available at checkout.
                </p>
              </TabsContent>
              <TabsContent value="returns" className="pt-4">
                <p className="text-sm text-gray-600">
                  We offer a 30-day return policy. Items must be unworn and in original packaging.
                  Please contact our customer support team to initiate a return.
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
