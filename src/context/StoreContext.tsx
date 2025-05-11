
import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { useToast } from "@/components/ui/use-toast";
import { CartItem, Product } from "@/data/mockData";
import { getCart, addToCart, updateCartItem, removeFromCart, clearCart } from "@/services/api";

interface StoreContextType {
  cart: CartItem[];
  isLoading: boolean;
  addItemToCart: (product: Product, quantity: number, size: string, color: string) => Promise<void>;
  updateItemQuantity: (index: number, quantity: number) => Promise<void>;
  removeItem: (index: number) => Promise<void>;
  clearAllItems: () => Promise<void>;
  cartTotal: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Calculate cart total
  const cartTotal = cart.reduce(
    (total, item) => 
      total + (item.product.discountedPrice || item.product.price) * item.quantity, 
    0
  );

  // Load cart from API (localStorage)
  useEffect(() => {
    const loadCart = async () => {
      try {
        setIsLoading(true);
        const cartData = await getCart();
        setCart(cartData);
      } catch (error) {
        console.error("Failed to load cart:", error);
        toast({
          title: "Error",
          description: "Failed to load your cart. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
  }, [toast]);

  // Add item to cart
  const addItemToCart = async (
    product: Product,
    quantity: number,
    size: string,
    color: string
  ) => {
    try {
      const updatedCart = await addToCart({ product, quantity, size, color });
      setCart(updatedCart);
      toast({
        title: "Added to Cart",
        description: `${product.name} has been added to your cart.`,
      });
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      toast({
        title: "Error",
        description: "Failed to add item to your cart. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Update item quantity
  const updateItemQuantity = async (index: number, quantity: number) => {
    try {
      const updatedCart = await updateCartItem(index, quantity);
      setCart(updatedCart);
    } catch (error) {
      console.error("Failed to update cart item:", error);
      toast({
        title: "Error",
        description: "Failed to update item quantity. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Remove item from cart
  const removeItem = async (index: number) => {
    try {
      const updatedCart = await removeFromCart(index);
      setCart(updatedCart);
      toast({
        title: "Item Removed",
        description: "The item has been removed from your cart.",
      });
    } catch (error) {
      console.error("Failed to remove cart item:", error);
      toast({
        title: "Error",
        description: "Failed to remove item from your cart. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Clear cart
  const clearAllItems = async () => {
    try {
      await clearCart();
      setCart([]);
    } catch (error) {
      console.error("Failed to clear cart:", error);
      toast({
        title: "Error",
        description: "Failed to clear your cart. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        isLoading,
        addItemToCart,
        updateItemQuantity,
        removeItem,
        clearAllItems,
        cartTotal,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
