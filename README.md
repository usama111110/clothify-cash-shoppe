
# StyleHaven E-commerce Application

This is a full-stack e-commerce application built with React, TypeScript, Tailwind CSS, and Flask.

## Frontend (React)

The frontend is built with:

- React
- TypeScript
- Tailwind CSS
- Shadcn UI Components
- React Router DOM
- TanStack Query (React Query)

## Backend (Flask)

The backend is built with Flask, a Python web framework. The backend code is located in `server.py` in the root directory.

### Running the Backend

1. Make sure you have Python installed
2. Install dependencies: `pip install flask flask-cors`
3. Run the Flask server: `python server.py`

The server will start at http://localhost:5000

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

## Development

1. Clone this repository
2. Install frontend dependencies: `npm install` or `yarn`
3. Start the frontend development server: `npm run dev` or `yarn dev`
4. In a separate terminal, start the Flask backend: `python server.py`

The application will be available at http://localhost:5173
