
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  discountedPrice?: number;
  description: string;
  images: string[];
  sizes: string[];
  colors: string[];
  inStock: boolean;
  featured: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  customerDetails: {
    name: string;
    email: string;
    address: string;
    phone: string;
  };
  paymentMethod: 'cash_on_delivery';
  date: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Classic White T-Shirt",
    category: "t-shirts",
    price: 19.99,
    description: "A comfortable and versatile white t-shirt that goes with everything.",
    images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=500&auto=format&fit=crop"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["white", "black", "gray"],
    inStock: true,
    featured: true
  },
  {
    id: "2",
    name: "Slim Fit Jeans",
    category: "pants",
    price: 49.99,
    discountedPrice: 39.99,
    description: "Modern slim fit jeans with a comfortable stretch fabric.",
    images: ["https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=500&auto=format&fit=crop"],
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["blue", "black", "gray"],
    inStock: true,
    featured: true
  },
  {
    id: "3",
    name: "Casual Summer Dress",
    category: "dresses",
    price: 39.99,
    description: "Light and flowy summer dress perfect for warm days.",
    images: ["https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=500&auto=format&fit=crop"],
    sizes: ["XS", "S", "M", "L"],
    colors: ["floral", "blue", "white"],
    inStock: true,
    featured: false
  },
  {
    id: "4",
    name: "Cotton Hoodie",
    category: "hoodies",
    price: 45.99,
    description: "Soft cotton hoodie with front pocket and drawstring hood.",
    images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=500&auto=format&fit=crop"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["gray", "black", "navy"],
    inStock: true,
    featured: true
  },
  {
    id: "5",
    name: "Formal Blazer",
    category: "jackets",
    price: 89.99,
    description: "Elegant blazer suitable for formal occasions and office wear.",
    images: ["https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=500&auto=format&fit=crop"],
    sizes: ["36", "38", "40", "42", "44"],
    colors: ["black", "navy", "charcoal"],
    inStock: true,
    featured: false
  },
  {
    id: "6",
    name: "Summer Shorts",
    category: "shorts",
    price: 29.99,
    description: "Comfortable cotton shorts perfect for summer days.",
    images: ["https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=500&auto=format&fit=crop"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["beige", "navy", "olive"],
    inStock: true,
    featured: false
  },
  {
    id: "7",
    name: "Athletic Sneakers",
    category: "shoes",
    price: 79.99,
    discountedPrice: 59.99,
    description: "Comfortable athletic sneakers suitable for running and casual wear.",
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=500&auto=format&fit=crop"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["white", "black", "red"],
    inStock: true,
    featured: true
  },
  {
    id: "8",
    name: "Leather Belt",
    category: "accessories",
    price: 24.99,
    description: "Classic leather belt with metal buckle.",
    images: ["https://images.unsplash.com/photo-1553704571-c32d38af5e0c?q=80&w=500&auto=format&fit=crop"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["black", "brown"],
    inStock: true,
    featured: false
  }
];

export const orders: Order[] = [
  {
    id: "ord-001",
    items: [
      {
        product: products[0],
        quantity: 2,
        size: "M",
        color: "white"
      },
      {
        product: products[1],
        quantity: 1,
        size: "32",
        color: "blue"
      }
    ],
    total: 79.97,
    status: "delivered",
    customerDetails: {
      name: "John Doe",
      email: "john@example.com",
      address: "123 Main St, Cityville, ST 12345",
      phone: "555-123-4567"
    },
    paymentMethod: "cash_on_delivery",
    date: "2023-04-15"
  },
  {
    id: "ord-002",
    items: [
      {
        product: products[3],
        quantity: 1,
        size: "L",
        color: "black"
      }
    ],
    total: 45.99,
    status: "shipped",
    customerDetails: {
      name: "Jane Smith",
      email: "jane@example.com",
      address: "456 Oak Ave, Townsville, ST 67890",
      phone: "555-987-6543"
    },
    paymentMethod: "cash_on_delivery",
    date: "2023-04-17"
  },
  {
    id: "ord-003",
    items: [
      {
        product: products[4],
        quantity: 1,
        size: "40",
        color: "navy"
      },
      {
        product: products[7],
        quantity: 1,
        size: "M",
        color: "black"
      }
    ],
    total: 114.98,
    status: "pending",
    customerDetails: {
      name: "Robert Johnson",
      email: "robert@example.com",
      address: "789 Pine Rd, Villagetown, ST 24680",
      phone: "555-456-7890"
    },
    paymentMethod: "cash_on_delivery",
    date: "2023-04-18"
  }
];

// Sales data for dashboard
export const salesData = [
  { name: 'Jan', total: 1250 },
  { name: 'Feb', total: 1900 },
  { name: 'Mar', total: 2300 },
  { name: 'Apr', total: 3200 },
  { name: 'May', total: 2800 },
  { name: 'Jun', total: 3500 },
  { name: 'Jul', total: 4000 },
];

export const categoryStats = [
  { name: 't-shirts', value: 35 },
  { name: 'pants', value: 25 },
  { name: 'dresses', value: 15 },
  { name: 'hoodies', value: 10 },
  { name: 'jackets', value: 8 },
  { name: 'accessories', value: 7 },
];
