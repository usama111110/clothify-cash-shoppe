
import { Product, CartItem, Order, products, orders } from "../data/mockData";

// Simulate API calls with timeout
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Product APIs
export const getProducts = async (): Promise<Product[]> => {
  await delay(500); // Simulate network delay
  return products;
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  await delay(300);
  return products.find(product => product.id === id);
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  await delay(400);
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  await delay(400);
  return products.filter(product => product.featured);
};

// Cart APIs (using localStorage for persistence)
export const getCart = async (): Promise<CartItem[]> => {
  await delay(200);
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

export const addToCart = async (item: CartItem): Promise<CartItem[]> => {
  await delay(300);
  const cart = await getCart();
  
  // Check if product already exists with same size and color
  const existingItemIndex = cart.findIndex(
    cartItem => 
      cartItem.product.id === item.product.id && 
      cartItem.size === item.size && 
      cartItem.color === item.color
  );
  
  if (existingItemIndex >= 0) {
    // Update quantity if exists
    cart[existingItemIndex].quantity += item.quantity;
  } else {
    // Add new item
    cart.push(item);
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  return cart;
};

export const updateCartItem = async (index: number, quantity: number): Promise<CartItem[]> => {
  await delay(200);
  const cart = await getCart();
  
  if (index >= 0 && index < cart.length) {
    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      cart.splice(index, 1);
    } else {
      cart[index].quantity = quantity;
    }
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  return cart;
};

export const removeFromCart = async (index: number): Promise<CartItem[]> => {
  await delay(200);
  const cart = await getCart();
  
  if (index >= 0 && index < cart.length) {
    cart.splice(index, 1);
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  return cart;
};

export const clearCart = async (): Promise<CartItem[]> => {
  await delay(200);
  localStorage.removeItem('cart');
  return [];
};

// Order APIs
export const getOrders = async (): Promise<Order[]> => {
  await delay(500);
  return orders;
};

export const getOrderById = async (id: string): Promise<Order | undefined> => {
  await delay(300);
  return orders.find(order => order.id === id);
};

export const createOrder = async (
  cartItems: CartItem[], 
  customerDetails: Order['customerDetails']
): Promise<Order> => {
  await delay(800);
  
  const total = cartItems.reduce(
    (sum, item) => sum + (item.product.discountedPrice || item.product.price) * item.quantity, 
    0
  );
  
  const newOrder: Order = {
    id: `ord-${Math.floor(Math.random() * 10000).toString().padStart(3, '0')}`,
    items: cartItems,
    total,
    status: 'pending',
    customerDetails,
    paymentMethod: 'cash_on_delivery',
    date: new Date().toISOString().split('T')[0]
  };
  
  orders.push(newOrder);
  return newOrder;
};
