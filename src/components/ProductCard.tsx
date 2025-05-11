
import { Link } from "react-router-dom";
import { Product } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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
        "group relative overflow-hidden rounded-md border bg-white transition-all hover:shadow-md",
        className
      )}
    >
      {/* Product Image */}
      <Link to={`/product/${product.id}`} className="block overflow-hidden aspect-[3/4]">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      {/* Discount Badge */}
      {hasDiscount && (
        <Badge className="absolute top-2 left-2 bg-shop-accent text-white">
          {discountPercentage}% OFF
        </Badge>
      )}

      {/* Product Info */}
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium line-clamp-1 mb-1 text-shop-primary hover:text-shop-accent transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-500 mb-2 capitalize">{product.category}</p>
        <div className="flex items-center">
          {hasDiscount ? (
            <>
              <span className="font-semibold text-shop-accent">${product.discountedPrice?.toFixed(2)}</span>
              <span className="ml-2 text-sm text-gray-400 line-through">${product.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="font-semibold">${product.price.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
