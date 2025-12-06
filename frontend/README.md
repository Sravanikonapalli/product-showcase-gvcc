Product Showcase & Enquiry App

A simple product showcase web app with React frontend and Node.js + Express + SQLite backend. Users can browse products, view details, and send enquiries. Admin can view all enquiries using a secret token.

📦 Features

Browse products with pagination, search, and category filters.

View product details in a modal with long description and images.

Submit product-specific enquiries via a form.

Admin can fetch all enquiries (requires ADMIN_TOKEN).

SQLite database with sample seed data for demo.

🌐 Live URLs
Environment	URL
Frontend	http://localhost:3000 (or your deployed URL)
Backend API	http://localhost:5000/api
Health check	http://localhost:5000/api/health

Replace localhost with your deployed domain if hosted.

🔧 Prerequisites

Node.js v18+

npm v9+

SQLite3 (optional for inspecting the DB)

🏗️ Backend Setup
1. Install dependencies
cd backend
npm install

2. Environment variables

Create .env in backend:

PORT=5000
DB_FILE=./data/mydatabase.sqlite
ADMIN_TOKEN=mysupersecrettoken123

3. Initialize database
node seed.js


This will:

Create tables (products, enquiries)

Seed sample products

4. Start server
npm start


Server runs at http://localhost:5000

5. API Endpoints

GET /api/products – List products (supports query params: search, category, page, limit)

GET /api/products/:id – Get product details

POST /api/enquiries – Submit enquiry

GET /api/enquiries – Admin only (requires x-admin-token header)

🏗️ Frontend Setup
1. Install dependencies
cd frontend
npm install

2. Environment variables (optional)

Create .env in frontend:

REACT_APP_API_URL=http://localhost:5000


Default is http://localhost:5000 if not provided.

3. Start frontend
npm start


App runs at http://localhost:3000 by default.

⚡ Usage

Open http://localhost:3000

Browse products

Click View on any product card

Optional: Click Enquire to send a message

Admin can fetch all enquiries using:

curl -H "x-admin-token: mysupersecrettoken123" http://localhost:5000/api/enquiries

📁 Folder Structure
root/
│
├─ backend/
│   ├─ db.js            # SQLite wrapper
│   ├─ index.js         # Express server
│   ├─ routes/
│   │   ├─ products.js
│   │   └─ enquiries.js
│   ├─ schema.sql       # DB schema
│   ├─ seed.sql         # Sample data
│   └─ seed.js          # Seed script
│
├─ frontend/
│   ├─ src/
│   │   ├─ api.js
│   │   ├─ App.js
│   │   ├─ pages/Home.js
│   │   └─ components/
│   │       ├─ ProductList.js
│   │       ├─ ProductCard.js
│   │       ├─ ProductDetailsModal.js
│   │       └─ EnquiryForm.js
│   └─ public/images/   # Sample images
│
└─ README.md

🛠️ Deployment Notes

Backend can be hosted on Render, Railway, or Heroku.

Frontend can be deployed on Vercel or Netlify.

Make sure to update REACT_APP_API_URL to your deployed backend URL.

Set ADMIN_TOKEN in your server environment for security.

✅ Tech Stack

Frontend: React, Axios, CSS

Backend: Node.js, Express, SQLite

Database: SQLite3

Dev Tools: npm, dotenv