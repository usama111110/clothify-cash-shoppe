
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductsByCategory } from "@/services/api";
import { Product } from "@/data/mockData";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useStore } from "@/context/StoreContext";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { cart } = useStore();

  const categoryNames: { [key: string]: string } = {
    'all': 'All Products',
    't-shirts': 'T-Shirts',
    'pants': 'Pants',
    'dresses': 'Dresses',
    'hoodies': 'Hoodies',
    'jackets': 'Jackets',
    'shorts': 'Shorts',
    'shoes': 'Shoes',
    'accessories': 'Accessories',
  };

  const categoryName = categoryId ? categoryNames[categoryId] || 'Products' : 'All Products';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        if (categoryId) {
          const data = await getProductsByCategory(categoryId);
          setProducts(data);
        }
      } catch (error) {
        console.error(`Failed to fetch products for category ${categoryId}:`, error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar cartItems={cart} />
      <main className="flex-grow">
        {/* Header */}
        <div className="bg-shop-secondary py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-center">{categoryName}</h1>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          {/* Results Count */}
          <div className="mb-6 text-gray-600">
            {isLoading ? (
              "Loading products..."
            ) : (
              `Showing ${products.length} ${products.length === 1 ? 'product' : 'products'}`
            )}
          </div>
          
          {/* Products Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="rounded-md border bg-gray-100 h-72 animate-pulse"
                />
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No Products Found</h3>
              <p className="text-gray-600">
                We don't have any products in this category yet.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
