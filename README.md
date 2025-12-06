### Product Showcase & Enquiry App

A demo **React + Node.js + SQLite** application to browse products, view details, and submit enquiries.

### Tech Stack

# Frontend:
1. React 
2. React Router v6
3. Axios
4. CSS 

# Backend:
1. Node.js + Express
2. SQLite
3. dotenv for environment variables

### Live URLs

- Backend API: https://product-showcase-gvcc.onrender.com

- Frontend App: https://product-showcase-gvcc.vercel.app


### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Setup environment variables:
Create a .env file in backend/:
```bash
PORT=5000
DB_FILE=./data/mydatabase.sqlite
ADMIN_TOKEN=mysupersecrettoken123
```

4. Initialize database with schema + sample data:
```bash
node seed.js (or) npm run seed
```

5. Start backend server:
```bash
node index.js
```

You should see:

Backend listening on http://localhost:5000
Connected to SQLite DB at ./data/mydatabase.sqlite


### API Endpoints:

GET /api/products -> list products

GET /api/products/:id -> product details

POST /api/enquiries -> submit enquiry

GET /api/enquiries -> fetch enquiries (requires x-admin-token header)

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```


3. Start frontend development server:
```bash
npm start
```

The app will run on http://localhost:3000

Products can be browsed, viewed, and enquiries submitted


### Features

- Browse products with search and category filters
- Pagination support (6 items per page)
- View product details in modal
- Submit enquiries (linked to a product if selected)
- Admin token-protected endpoint to fetch all enquiries
- Responsive and clean UI
