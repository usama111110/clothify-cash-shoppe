
"""
Flask Backend for Online Shopping Application
This is a simple Flask API for the online shopping application frontend.
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes and origins

# Mock database (would be replaced by a real database in production)
DATA_FILE = 'store_data.json'

# Initialize sample data if the file doesn't exist
def init_data():
    if not os.path.exists(DATA_FILE):
        sample_data = {
            "products": [
                {
                    "id": "1",
                    "name": "Classic White T-Shirt",
                    "category": "t-shirts",
                    "price": 19.99,
                    "description": "A comfortable and versatile white t-shirt that goes with everything.",
                    "images": ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=500&auto=format&fit=crop"],
                    "sizes": ["S", "M", "L", "XL"],
                    "colors": ["white", "black", "gray"],
                    "inStock": True,
                    "featured": True
                },
                {
                    "id": "2",
                    "name": "Slim Fit Jeans",
                    "category": "pants",
                    "price": 49.99,
                    "discountedPrice": 39.99,
                    "description": "Modern slim fit jeans with a comfortable stretch fabric.",
                    "images": ["https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=500&auto=format&fit=crop"],
                    "sizes": ["28", "30", "32", "34", "36"],
                    "colors": ["blue", "black", "gray"],
                    "inStock": True,
                    "featured": True
                },
            ],
            "orders": []
        }
        with open(DATA_FILE, 'w') as f:
            json.dump(sample_data, f)

# Load data from file
def load_data():
    init_data()
    with open(DATA_FILE, 'r') as f:
        return json.load(f)

# Save data to file
def save_data(data):
    with open(DATA_FILE, 'w') as f:
        json.dump(data, f)

# API Routes

@app.route('/api/products', methods=['GET'])
def get_products():
    """Get all products"""
    data = load_data()
    return jsonify(data['products'])

@app.route('/api/products/<product_id>', methods=['GET'])
def get_product(product_id):
    """Get a specific product by ID"""
    data = load_data()
    product = next((p for p in data['products'] if p['id'] == product_id), None)
    
    if not product:
        return jsonify({"error": "Product not found"}), 404
    
    return jsonify(product)

@app.route('/api/products/category/<category>', methods=['GET'])
def get_products_by_category(category):
    """Get products by category"""
    data = load_data()
    products = [p for p in data['products'] if p['category'] == category]
    return jsonify(products)

@app.route('/api/featured-products', methods=['GET'])
def get_featured_products():
    """Get featured products"""
    data = load_data()
    featured = [p for p in data['products'] if p.get('featured', False)]
    return jsonify(featured)

@app.route('/api/orders', methods=['GET'])
def get_orders():
    """Get all orders (admin only)"""
    data = load_data()
    return jsonify(data['orders'])

@app.route('/api/orders/<order_id>', methods=['GET'])
def get_order(order_id):
    """Get a specific order by ID"""
    data = load_data()
    order = next((o for o in data['orders'] if o['id'] == order_id), None)
    
    if not order:
        return jsonify({"error": "Order not found"}), 404
    
    return jsonify(order)

@app.route('/api/orders', methods=['POST'])
def create_order():
    """Create a new order"""
    order_data = request.get_json()
    
    if not order_data:
        return jsonify({"error": "No data provided"}), 400
    
    data = load_data()
    
    # Create new order ID
    order_id = f"ord-{len(data['orders']) + 1:03d}"
    
    # Add order to database
    new_order = {
        "id": order_id,
        "items": order_data.get("items", []),
        "total": order_data.get("total", 0),
        "status": "pending",
        "customerDetails": order_data.get("customerDetails", {}),
        "paymentMethod": "cash_on_delivery",
        "date": datetime.now().strftime("%Y-%m-%d")
    }
    
    data['orders'].append(new_order)
    save_data(data)
    
    return jsonify(new_order), 201

@app.route('/api/orders/<order_id>/status', methods=['PUT'])
def update_order_status(order_id):
    """Update an order's status (admin only)"""
    status_data = request.get_json()
    new_status = status_data.get("status")
    
    if not new_status:
        return jsonify({"error": "No status provided"}), 400
    
    data = load_data()
    order = next((o for o in data['orders'] if o['id'] == order_id), None)
    
    if not order:
        return jsonify({"error": "Order not found"}), 404
    
    # Update order status
    order['status'] = new_status
    save_data(data)
    
    return jsonify(order)

@app.route('/api/dashboard/stats', methods=['GET'])
def get_dashboard_stats():
    """Get stats for admin dashboard"""
    data = load_data()
    orders = data['orders']
    
    # Calculate stats
    total_revenue = sum(order['total'] for order in orders)
    orders_count = len(orders)
    avg_order_value = total_revenue / orders_count if orders_count > 0 else 0
    
    # Mock some additional data
    sales_data = [
        {"name": 'Jan', "total": 1250},
        {"name": 'Feb', "total": 1900},
        {"name": 'Mar', "total": 2300},
        {"name": 'Apr', "total": 3200},
        {"name": 'May', "total": 2800},
        {"name": 'Jun', "total": 3500},
        {"name": 'Jul', "total": 4000},
    ]
    
    category_stats = [
        {"name": 't-shirts', "value": 35},
        {"name": 'pants', "value": 25},
        {"name": 'dresses', "value": 15},
        {"name": 'hoodies', "value": 10},
        {"name": 'jackets', "value": 8},
        {"name": 'accessories', "value": 7},
    ]
    
    return jsonify({
        "totalRevenue": round(total_revenue, 2),
        "ordersCount": orders_count,
        "avgOrderValue": round(avg_order_value, 2),
        "customersCount": orders_count,  # Simplified assumption
        "salesData": sales_data,
        "categoryStats": category_stats
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
