# E-Shop Backend

This is the backend for the **E-Shop** project — a simple e-commerce system built using Node.js and PostgreSQL. It manages users, products, carts, and orders efficiently with a clean architecture.

## 🚀 Features

- User Authentication with OTP
- Product Management (CRUD)
- Shopping Cart Functionality
- Order & Order Items Handling
- PostgreSQL with Sequelize ORM


## 🛠️ Tech Stack

- **Node.js**
- **PostgreSQL**
- **Sequelize**
- **Express (core Node, if not used)**

## ⚙️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo

## **Install dependencies**
    npm install

## **Run the server**
    npm start


## **API Endpoints**
    POST    /send-otp
    POST    /verify-otp
    POST    /signup
    POST    /login
    GET     /get-user/:id
    GET     /user
    DELETE  /delete-user/:id
    PATCH   /update/:id
    GET     /products
    POST    /add-product
    DELTE   /delete-product/:id
    POST    /add-to-cart
    GET     /fetch-cart
    DELETE  /remove-from-cart/:productId
    POST    /place-order
    GET     /fetch-order-details
    GET     /get-order/:orderId
    POST    /cancel-order/:orderId


## **Dependencies**
    sequelize
    pg
    dotenv
  

## **env example**

BREVO_API_KEY = 
JWT_SECRET = 
DB_NAME = 
DB_USER = 
DB_PASSWORD = 
DB_HOST = 