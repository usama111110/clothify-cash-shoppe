
# StyleHaven Backend

This is the Flask backend for the StyleHaven e-commerce application.

## Getting Started

### Development

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Start the Flask server:
```bash
python server.py
```

The API will be available at http://localhost:5000

### Docker Setup

1. Build the Docker image:
```bash
docker build -t stylehaven-backend .
```

2. Run the container:
```bash
docker run -p 5000:5000 stylehaven-backend
```

The API will be available at http://localhost:5000

## API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get a specific product
- `GET /api/products/category/{category}` - Get products by category
- `GET /api/featured-products` - Get featured products
- `GET /api/orders` - Get all orders (admin)
- `POST /api/orders` - Create a new order
- `GET /api/dashboard/stats` - Get admin dashboard stats
