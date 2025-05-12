
# StyleHaven E-commerce Application

This is a full-stack e-commerce application built with React, TypeScript, Tailwind CSS, and Flask.

## Project Structure

The project is organized into two main directories:

- `/frontend` - React/TypeScript frontend application
- `/backend` - Flask Python backend API

## Getting Started

You can run this application using Docker or with traditional development setup.

### Docker Setup (Recommended)

1. Make sure you have Docker and Docker Compose installed on your machine.

2. Build and start the containers:
```bash
docker-compose up --build
```

3. Access the application:
   - Frontend: http://localhost
   - Backend API: http://localhost:5000

To stop the containers:
```bash
docker-compose down
```

### Traditional Setup

#### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install the required Python dependencies:
```bash
pip install -r requirements.txt
```

3. Start the Flask server:
```bash
python server.py
```

The API will be available at http://localhost:5000

#### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install the required Node.js dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at http://localhost:8080

## Features

- Product browsing and filtering
- Shopping cart functionality
- Checkout process
- Order confirmation
- Admin dashboard with:
  - Sales analytics
  - Order management
  - Product management
  - Customer management

## Admin Access

To access the admin dashboard:
- URL: `/admin/login`
- Username: `admin`
- Password: `admin123`
