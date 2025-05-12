import { Product, CartItem, Order, products, orders } from "../data/mockData";

// API base URL - use the Flask server when available, fallback to mock data
const API_BASE_URL = "http://localhost:5000/api";

// Helper function to check if Flask API is available
const isApiAvailable = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.log("API not available, using mock data");
    return false;
  }
};

// Simulate API calls with timeout
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Product APIs
export const getProducts = async (): Promise<Product[]> => {
  try {
    const apiAvailable = await isApiAvailable();
    if (apiAvailable) {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (response.ok) {
        return response.json();
      }
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
  
  // Fallback to mock data
  await delay(500);
  return products;
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  try {
    const apiAvailable = await isApiAvailable();
    if (apiAvailable) {
      const response = await fetch(`${API_BASE_URL}/products/${id}`);
      if (response.ok) {
        return response.json();
      }
    }
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
  }
  
  // Fallback to mock data
  await delay(300);
  return products.find(product => product.id === id);
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const apiAvailable = await isApiAvailable();
    if (apiAvailable) {
      const response = await fetch(`${API_BASE_URL}/products/category/${category}`);
      if (response.ok) {
        return response.json();
      }
    }
  } catch (error) {
    console.error(`Error fetching products by category ${category}:`, error);
  }
  
  // Fallback to mock data
  await delay(400);
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  try {
    const apiAvailable = await isApiAvailable();
    if (apiAvailable) {
      const response = await fetch(`${API_BASE_URL}/featured-products`);
      if (response.ok) {
        return response.json();
      }
    }
  } catch (error) {
    console.error("Error fetching featured products:", error);
  }
  
  // Fallback to mock data
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
  try {
    const apiAvailable = await isApiAvailable();
    if (apiAvailable) {
      const response = await fetch(`${API_BASE_URL}/orders`);
      if (response.ok) {
        return response.json();
      }
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
  
  // Fallback to mock data
  await delay(500);
  return orders;
};

export const getOrderById = async (id: string): Promise<Order | undefined> => {
  try {
    const apiAvailable = await isApiAvailable();
    if (apiAvailable) {
      const response = await fetch(`${API_BASE_URL}/orders/${id}`);
      if (response.ok) {
        return response.json();
      }
    }
  } catch (error) {
    console.error(`Error fetching order ${id}:`, error);
  }
  
  // Fallback to mock data
  await delay(300);
  return orders.find(order => order.id === id);
};

export const createOrder = async (
  cartItems: CartItem[], 
  customerDetails: Order['customerDetails']
): Promise<Order> => {
  try {
    const apiAvailable = await isApiAvailable();
    if (apiAvailable) {
      const total = cartItems.reduce(
        (sum, item) => sum + (item.product.discountedPrice || item.product.price) * item.quantity, 
        0
      );
      
      const orderData = {
        items: cartItems,
        total,
        customerDetails,
      };
      
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      
      if (response.ok) {
        return response.json();
      }
    }
  } catch (error) {
    console.error("Error creating order:", error);
  }
  
  // Fallback to mock data
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

export const updateOrderStatus = async (orderId: string, status: string): Promise<Order | undefined> => {
  try {
    const apiAvailable = await isApiAvailable();
    if (apiAvailable) {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      
      if (response.ok) {
        return response.json();
      }
    }
  } catch (error) {
    console.error(`Error updating order ${orderId}:`, error);
  }
  
  // Fallback to mock data
  await delay(300);
  const order = orders.find(order => order.id === orderId);
  if (order) {
    order.status = status as Order['status'];
  }
  return order;
};

// Dashboard stats API
export const getDashboardStats = async () => {
  try {
    const apiAvailable = await isApiAvailable();
    if (apiAvailable) {
      const response = await fetch(`${API_BASE_URL}/dashboard/stats`);
      if (response.ok) {
        return response.json();
      }
    }
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
  }
  
  // Fallback to mock data calculation
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const ordersCount = orders.length;
  const avgOrderValue = ordersCount > 0 ? totalRevenue / ordersCount : 0;
  
  return {
    totalRevenue: Math.round(totalRevenue * 100) / 100,
    ordersCount,
    avgOrderValue: Math.round(avgOrderValue * 100) / 100,
    customersCount: ordersCount,
    salesData: [
      {name: 'Jan', total: 1250},
      {name: 'Feb', total: 1900},
      {name: 'Mar', total: 2300},
      {name: 'Apr', total: 3200},
      {name: 'May', total: 2800},
      {name: 'Jun', total: 3500},
      {name: 'Jul', total: 4000},
    ],
    categoryStats: [
      {name: 't-shirts', value: 35},
      {name: 'pants', value: 25}, 
      {name: 'dresses', value: 15},
      {name: 'hoodies', value: 10},
      {name: 'jackets', value: 8},
      {name: 'accessories', value: 7},
    ]
  };
};
