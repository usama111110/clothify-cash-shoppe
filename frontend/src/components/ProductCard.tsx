
import { Link } from "react-router-dom";
import { Product } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  const hasDiscount = product.discountedPrice !== undefined;
  const discountPercentage = hasDiscount
    ? Math.round(((product.price - product.discountedPrice!) / product.price) * 100)
    : 0;

  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-xl border-none transition-all hover:shadow-xl bg-white dark:bg-gray-800",
        className
      )}
    >
      {/* Product Image */}
      <Link to={`/product/${product.id}`} className="block overflow-hidden aspect-[3/4] relative">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
        
        {/* Hover Actions */}
        <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-2">
          <Button size="icon" variant="secondary" className="rounded-full bg-white/90 hover:bg-white shadow-md">
            <Heart className="h-4 w-4 text-shop-accent" />
          </Button>
          <Button size="icon" variant="secondary" className="rounded-full bg-white/90 hover:bg-white shadow-md">
            <ShoppingCart className="h-4 w-4 text-shop-accent" />
          </Button>
        </div>
      </Link>

      {/* Discount Badge */}
      {hasDiscount && (
        <Badge className="absolute top-3 left-3 bg-shop-accent text-white font-medium px-2 py-1">
          {discountPercentage}% OFF
        </Badge>
      )}

      {/* Product Info */}
      <div className="p-4">
        <div className="text-xs text-gray-500 mb-1 capitalize">{product.category}</div>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium line-clamp-1 mb-2 text-shop-primary group-hover:text-shop-accent transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between">
          <div>
            {hasDiscount ? (
              <>
                <span className="font-semibold text-shop-accent">${product.discountedPrice?.toFixed(2)}</span>
                <span className="ml-2 text-sm text-gray-400 line-through">${product.price.toFixed(2)}</span>
              </>
            ) : (
              <span className="font-semibold">${product.price.toFixed(2)}</span>
            )}
          </div>
          <div className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
            {product.rating ?? 4.5} ★
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
