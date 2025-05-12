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
  featured?: boolean;
  rating?: number;
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
    city: string;
    zip: string;
    country: string;
  };
  paymentMethod: 'credit_card' | 'paypal' | 'cash_on_delivery';
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
    featured: true,
    rating: 4.5
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
    featured: true,
    rating: 4.8
  },
  {
    id: "3",
    name: "Summer Dress",
    category: "dresses",
    price: 79.99,
    description: "Elegant summer dress perfect for any occasion.",
    images: ["https://images.unsplash.com/photo-1585482253685-c6905407901a?q=80&w=500&auto=format&fit=crop"],
    sizes: ["XS", "S", "M", "L"],
    colors: ["red", "blue", "yellow"],
    inStock: true,
    featured: false,
    rating: 4.2
  },
  {
    id: "4",
    name: "Hoodie",
    category: "hoodies",
    price: 59.99,
    description: "Cozy hoodie for chilly days.",
    images: ["https://images.unsplash.com/photo-1533909720854-69870845643c?q=80&w=500&auto=format&fit=crop"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["black", "gray", "navy"],
    inStock: true,
    featured: false,
    rating: 4.6
  },
  {
    id: "5",
    name: "Leather Jacket",
    category: "jackets",
    price: 199.99,
    description: "Stylish leather jacket for a night out.",
    images: ["https://images.unsplash.com/photo-1588075592484-393b09c6941b?q=80&w=500&auto=format&fit=crop"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["black", "brown"],
    inStock: true,
    featured: true,
    rating: 4.9
  },
  {
    id: "6",
    name: "Beanie",
    category: "accessories",
    price: 12.99,
    description: "Warm beanie to keep you cozy in winter.",
    images: ["https://images.unsplash.com/photo-1608591293574-541718134ca7?q=80&w=500&auto=format&fit=crop"],
    sizes: ["One Size"],
    colors: ["black", "gray", "red"],
    inStock: true,
    featured: false,
    rating: 4.4
  },
  {
    id: "7",
    name: "Cargo Pants",
    category: "pants",
    price: 55.00,
    description: "Durable cargo pants with multiple pockets.",
    images: ["https://images.unsplash.com/photo-1617132483877-4547c283a914?q=80&w=500&auto=format&fit=crop"],
    sizes: ["30", "32", "34", "36"],
    colors: ["green", "black", "brown"],
    inStock: true,
    featured: false,
    rating: 4.3
  },
  {
    id: "8",
    name: "Denim Jacket",
    category: "jackets",
    price: 79.00,
    description: "Classic denim jacket that pairs well with anything.",
    images: ["https://images.unsplash.com/photo-1605593444227-568aa3a8b09c?q=80&w=500&auto=format&fit=crop"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["blue", "black"],
    inStock: true,
    featured: false,
    rating: 4.7
  },
  {
    id: "9",
    name: "Striped T-Shirt",
    category: "t-shirts",
    price: 22.50,
    description: "Casual striped t-shirt for everyday wear.",
    images: ["https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=500&auto=format&fit=crop"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["white/black", "navy/white", "red/white"],
    inStock: true,
    featured: false,
    rating: 4.1
  },
  {
    id: "10",
    name: "Chino Shorts",
    category: "shorts",
    price: 35.00,
    description: "Comfortable chino shorts for warm weather.",
    images: ["https://images.unsplash.com/photo-1623228537329-e9055a1a6c9f?q=80&w=500&auto=format&fit=crop"],
    sizes: ["28", "30", "32", "34"],
    colors: ["beige", "navy", "gray"],
    inStock: true,
    featured: false,
    rating: 4.0
  },
];

export const orders: Order[] = [
  {
    id: "ord-001",
    items: [
      {
        product: products[0],
        quantity: 2,
        size: "M",
        color: "white",
      },
      {
        product: products[1],
        quantity: 1,
        size: "32",
        color: "blue",
      },
    ],
    total: 89.97,
    status: "processing",
    customerDetails: {
      name: "John Doe",
      email: "john.doe@example.com",
      address: "123 Main St",
      city: "Anytown",
      zip: "12345",
      country: "USA",
    },
    paymentMethod: "credit_card",
    date: "2024-07-20",
  },
  {
    id: "ord-002",
    items: [
      {
        product: products[2],
        quantity: 1,
        size: "S",
        color: "red",
      },
    ],
    total: 79.99,
    status: "shipped",
    customerDetails: {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      address: "456 Elm St",
      city: "Springfield",
      zip: "67890",
      country: "USA",
    },
    paymentMethod: "paypal",
    date: "2024-07-22",
  },
  {
    id: "ord-003",
    items: [
      {
        product: products[3],
        quantity: 3,
        size: "L",
        color: "gray",
      },
    ],
    total: 179.97,
    status: "delivered",
    customerDetails: {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      address: "789 Oak St",
      city: "Riverside",
      zip: "24680",
      country: "USA",
    },
    paymentMethod: "cash_on_delivery",
    date: "2024-07-25",
  },
];
