
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useStore } from "@/context/StoreContext";
import CartItem from "@/components/CartItem";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CartPage = () => {
  const { cart, isLoading, updateItemQuantity, removeItem, cartTotal } = useStore();

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar cartItems={cart} />
        <main className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
          <div className="animate-pulse space-y-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex gap-4">
                <div className="h-24 w-24 bg-gray-200 rounded"></div>
                <div className="flex-grow space-y-2">
                  <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/5"></div>
                </div>
                <div className="w-24 h-8 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Empty cart state
  if (cart.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar cartItems={cart} />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Button asChild size="lg">
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
        <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              {cart.map((item, index) => (
                <CartItem
                  key={`${item.product.id}-${item.size}-${item.color}`}
                  item={item}
                  index={index}
                  onUpdateQuantity={updateItemQuantity}
                  onRemove={removeItem}
                />
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>${(cartTotal * 0.07).toFixed(2)}</span>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between font-semibold text-lg mb-6">
                <span>Total</span>
                <span>${(cartTotal + cartTotal * 0.07).toFixed(2)}</span>
              </div>
              
              <Button asChild className="w-full bg-shop-accent hover:bg-shop-accent/90" size="lg">
                <Link to="/checkout">Proceed to Checkout</Link>
              </Button>
              
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">Accepted Payment Methods</h3>
                <div className="flex items-center justify-center bg-shop-secondary rounded-md p-3">
                  <p className="text-sm text-center text-gray-700">
                    Cash on Delivery
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
