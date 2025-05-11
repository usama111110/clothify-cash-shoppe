
import { useState, useEffect } from "react";
import { getProducts } from "@/services/api";
import { Product } from "@/data/mockData";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useStore } from "@/context/StoreContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Filter, Search } from "lucide-react";

const categories = [
  { id: "all", name: "All Categories" },
  { id: "t-shirts", name: "T-Shirts" },
  { id: "pants", name: "Pants" },
  { id: "dresses", name: "Dresses" },
  { id: "hoodies", name: "Hoodies" },
  { id: "jackets", name: "Jackets" },
  { id: "shorts", name: "Shorts" },
  { id: "shoes", name: "Shoes" },
  { id: "accessories", name: "Accessories" },
];

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { cart } = useStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("featured");
  const [showDiscount, setShowDiscount] = useState(false);
  const [showInStock, setShowInStock] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const data = await getProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter based on search, category, and checkboxes
    let filtered = products;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Discount filter
    if (showDiscount) {
      filtered = filtered.filter(product => product.discountedPrice !== undefined);
    }

    // In stock filter
    if (showInStock) {
      filtered = filtered.filter(product => product.inStock);
    }

    // Sort products
    switch (sortOption) {
      case "price-low":
        filtered = [...filtered].sort((a, b) => 
          (a.discountedPrice || a.price) - (b.discountedPrice || b.price)
        );
        break;
      case "price-high":
        filtered = [...filtered].sort((a, b) => 
          (b.discountedPrice || b.price) - (a.discountedPrice || a.price)
        );
        break;
      case "newest":
        // This is a mock, so we'll just reverse the order as if newest were at the end
        filtered = [...filtered].reverse();
        break;
      case "featured":
      default:
        filtered = [...filtered].sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1));
        break;
    }

    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory, sortOption, showDiscount, showInStock]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar cartItems={cart} />
      <main className="flex-grow">
        {/* Header */}
        <div className="bg-shop-secondary py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-center">Shop All Products</h1>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          {/* Filters and Search */}
          <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
            {/* Sidebar Filters (desktop) */}
            <div className="hidden md:block">
              <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-24">
                <h2 className="text-lg font-semibold mb-4">Filters</h2>
                
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Categories</h3>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <div key={category.id} className="flex items-center">
                        <input
                          type="radio"
                          id={`category-${category.id}`}
                          name="category"
                          className="mr-2"
                          checked={selectedCategory === category.id}
                          onChange={() => setSelectedCategory(category.id)}
                        />
                        <label htmlFor={`category-${category.id}`}>{category.name}</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Availability</h3>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="in-stock"
                      checked={showInStock}
                      onCheckedChange={(checked) => 
                        setShowInStock(checked as boolean)
                      }
                    />
                    <Label htmlFor="in-stock">In stock only</Label>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Discount</h3>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="on-sale"
                      checked={showDiscount}
                      onCheckedChange={(checked) => 
                        setShowDiscount(checked as boolean)
                      }
                    />
                    <Label htmlFor="on-sale">On sale</Label>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Product Grid */}
            <div>
              {/* Search and Sort */}
              <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    placeholder="Search products..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>
                
                {/* Mobile Filters Button */}
                <div className="md:hidden">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full">
                      <Filter size={16} className="mr-2" />
                      <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Mobile Filter Options */}
              <div className="md:hidden mb-6 flex flex-wrap gap-2">
                {showDiscount && (
                  <div className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
                    On Sale
                    <button
                      onClick={() => setShowDiscount(false)}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </div>
                )}
                
                {showInStock && (
                  <div className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
                    In Stock
                    <button
                      onClick={() => setShowInStock(false)}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </div>
                )}
                
                <div className="flex items-center space-x-4 ml-auto">
                  <div className="flex items-center">
                    <Checkbox
                      id="mobile-discount"
                      checked={showDiscount}
                      onCheckedChange={(checked) => setShowDiscount(checked as boolean)}
                      className="mr-2"
                    />
                    <label htmlFor="mobile-discount" className="text-sm">On Sale</label>
                  </div>
                  
                  <div className="flex items-center">
                    <Checkbox
                      id="mobile-in-stock"
                      checked={showInStock}
                      onCheckedChange={(checked) => setShowInStock(checked as boolean)}
                      className="mr-2"
                    />
                    <label htmlFor="mobile-in-stock" className="text-sm">In Stock</label>
                  </div>
                </div>
              </div>
              
              {/* Results Count */}
              <div className="mb-4 text-gray-600">
                Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              </div>
              
              {/* Products Grid */}
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, index) => (
                    <div
                      key={index}
                      className="rounded-md border bg-gray-100 h-72 animate-pulse"
                    />
                  ))}
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">No Products Found</h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search or filter criteria.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("all");
                      setShowDiscount(false);
                      setShowInStock(false);
                      setSortOption("featured");
                    }}
                    className="text-shop-accent hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductsPage;
