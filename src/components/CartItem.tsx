
import { useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CartItem as CartItemType } from "@/data/mockData";

interface CartItemProps {
  item: CartItemType;
  index: number;
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemove: (index: number) => void;
}

const CartItem = ({ item, index, onUpdateQuantity, onRemove }: CartItemProps) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const { product, size, color } = item;
  const price = product.discountedPrice || product.price;
  const totalPrice = price * quantity;

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value) || 1;
    setQuantity(newQuantity);
    onUpdateQuantity(index, newQuantity);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center py-6 border-b">
      {/* Product Image */}
      <Link to={`/product/${product.id}`} className="w-24 h-24 rounded overflow-hidden flex-shrink-0 mb-4 sm:mb-0">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </Link>

      {/* Product Details */}
      <div className="flex-grow px-4">
        <Link to={`/product/${product.id}`} className="font-medium text-lg text-shop-primary hover:text-shop-accent">
          {product.name}
        </Link>
        <div className="mt-1 text-sm text-gray-600">
          <span className="capitalize">Size: {size}</span>
          <span className="mx-2">|</span>
          <span className="capitalize">Color: {color}</span>
        </div>
        <div className="mt-2 font-medium">${price.toFixed(2)}</div>
      </div>

      {/* Quantity */}
      <div className="flex sm:flex-col items-center mt-4 sm:mt-0 w-full sm:w-auto">
        <div className="flex items-center">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-r-none"
            onClick={() => onUpdateQuantity(index, Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          >
            -
          </Button>
          <Input
            type="number"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
            className="h-8 w-16 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-l-none"
            onClick={() => onUpdateQuantity(index, quantity + 1)}
          >
            +
          </Button>
        </div>

        <div className="flex items-center justify-between w-full sm:justify-end sm:mt-4">
          <div className="font-semibold text-shop-primary sm:mr-4">
            ${totalPrice.toFixed(2)}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove(index)}
            className="h-8 w-8 text-gray-500"
          >
            <X size={16} />
            <span className="sr-only">Remove</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
