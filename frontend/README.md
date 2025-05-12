
# StyleHaven Frontend

This is the React frontend for the StyleHaven e-commerce application.

## Getting Started

### Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The application will be available at http://localhost:8080

### Docker Setup

1. Build the Docker image:
```bash
docker build -t stylehaven-frontend .
```

2. Run the container:
```bash
docker run -p 80:80 stylehaven-frontend
```

The application will be available at http://localhost

## Features

- Product browsing and filtering
- Shopping cart functionality
- Checkout process
- Admin dashboard
