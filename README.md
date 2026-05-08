# 🛒 ShoppyGlobe Backend API

A scalable and secure E-commerce Backend API built using **Node.js**, **Express.js**, **MongoDB**, and **Mongoose** as part of the **Internshala Full Stack Development Project**.

This project provides a complete backend solution for an e-commerce platform including:

- JWT-based Authentication
- Product APIs
- Advanced Cart Management
- Protected Routes
- MongoDB Atomic Operations
- Error Handling Middleware

---

# 🚀 Tech Stack

| Technology | Purpose |
|------------|----------|
| Node.js | Runtime Environment |
| Express.js | Backend Framework |
| MongoDB | NoSQL Database |
| Mongoose | ODM for MongoDB |
| JWT (JSON Web Token) | Authentication & Authorization |
| bcryptjs | Password Hashing |
| dotenv | Environment Variables |

---

# ✨ Features

## 🔐 User Authentication

- User Registration
- User Login
- JWT Token Generation
- Protected Routes using Middleware

---

## 📦 Product Management

- Fetch All Products
- Fetch Product by ID
- MongoDB collection: `products`

---

## 🛒 Advanced Cart System

### Features Included

- Add products to cart
- Auto-increment quantity for existing items
- Update product quantity
- Remove items from cart
- Populate complete product details inside cart response

### MongoDB Operators Used

| Operator | Purpose |
|-----------|----------|
| `$set` | Update product quantity |
| `$pull` | Remove product from cart |
| `$inc` | Increment quantities |

---

## 🔄 Data Population

Implemented Mongoose `.populate()` to fetch complete product details inside the cart response.

### Example

```js
.populate("items.productId", "title price image")
```

### Response

```json
{
  "title": "iPhone 15",
  "price": 999,
  "image": "image-url"
}
```

---

# 🛡 Middleware & Error Handling

## Authentication Middleware

Protected routes use a custom `verifyToken` middleware.

## Global Error Handler

Centralized JSON error responses for cleaner API management.

### Example

```json
{
  "success": false,
  "message": "Unauthorized Access"
}
```

---

# 📁 Project Structure

```bash
ShoppyGlobe-Backend/
│
├── src/
│   │
│   ├── Model/
│   │   ├── cart.model.js
│   │   ├── products.model.js
│   │   └── user.model.js
│   │
│   ├── Controller/
│   │   ├── cart.controller.js
│   │   ├── products.controller.js
│   │   └── auth.controller.js
│   │
│   ├── Route/
│   │   ├── cart.route.js
│   │   ├── products.route.js
│   │   └── auth.route.js
│   │
│   ├── Middleware/
│   │   └── auth.middleware.js
│   │
│   └── app.js
│
├── .env
├── package.json
└── README.md
```

---

# ⚙️ Getting Started

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/shoppyglobe-backend.git
```

---

## 2️⃣ Navigate to Project Folder

```bash
cd shoppyglobe-backend
```

---

## 3️⃣ Install Dependencies

```bash
npm install
```

---

## 4️⃣ Configure Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## 5️⃣ Start the Server

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

---

# 🌐 API Base URL

```bash
http://localhost:5000
```

---

# 📚 API Documentation

## 🔐 Authentication APIs

| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/shoppyglobe/auth/register` | Register a new user |
| POST | `/shoppyglobe/auth/login` | Login user & generate JWT |

---

## 📦 Product APIs

| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/shoppyglobe/products` | Get all products |
| GET | `/shoppyglobe/products/:id` | Get product by ID |

---

## 🛒 Cart APIs (Protected)

> Requires Bearer Token Authentication

| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/shoppyglobe/cart` | Get user cart |
| POST | `/shoppyglobe/cart/add` | Add item to cart |
| PUT | `/shoppyglobe/cart/update` | Update item quantity |
| DELETE | `/shoppyglobe/cart/:productId` | Remove item from cart |

---

# 🔑 Authentication Flow

After successful login, the API returns a JWT token.

### Example Response

```json
{
  "token": "your_jwt_token"
}
```

Use this token in protected routes:

```http
Authorization: Bearer your_jwt_token
```

---

# 🧪 Testing the API

You can test the APIs using:

- Thunder Client (VS Code Extension)
- Postman

---

## 📌 Steps to Test Protected Routes

### 1️⃣ Register User

```http
POST /shoppyglobe/auth/register
```

---

### 2️⃣ Login User

```http
POST /shoppyglobe/auth/login
```

Copy the JWT token from the response.

---

### 3️⃣ Add Bearer Token

Inside Thunder Client/Postman:

```http
Authorization → Bearer Token
```

Paste the JWT token.

---

### 4️⃣ Test Protected Cart APIs

Now you can access:

```http
GET /shoppyglobe/cart
```

```http
POST /shoppyglobe/cart/add
```

etc.

---

# 📌 Example Cart Add Request

## Request

```json
{
  "productId": "6614e7f31d7f8a0012345678",
  "quantity": 1
}
```

---

# 📌 Example Cart Response with Populate

```json
{
  "items": [
    {
      "productId": {
        "_id": "6614e7f31d7f8a0012345678",
        "title": "Nike Shoes",
        "price": 1999,
        "image": "image-url"
      },
      "quantity": 2
    }
  ]
}
```

---

# 🔒 Protected Route Example

```js
router.get("/cart", verifyToken, getCart);
```

---

# 🧠 Concepts Implemented

- REST API Design
- MVC Architecture
- MongoDB Relationships
- JWT Authentication
- Middleware Handling
- Atomic Database Updates
- Error Handling
- Environment Configuration

---

# 📈 Future Improvements

- Product CRUD for Admin
- Order Management
- Payment Gateway Integration
- Wishlist System
- Pagination & Search
- Role-Based Access Control

---

# 👨‍💻 Author

Developed as part of the **Internshala Full Stack Development Program**.

---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub!
