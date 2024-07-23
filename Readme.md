# RBAC and Social Login Backend System

## Overview

This project is a robust backend system that implements Role-Based Access Control (RBAC) and social login integrations using Node.js, Express.js, and MongoDB. It ensures secure and granular access management through various user roles and facilitates seamless user authentication via popular social login providers.

## Key Features

### Role-Based Access Control (RBAC)
- **Roles**: Admin, Customer, Reviewer, Guest
- **Access Management**: Secure and granular control over different parts of the application based on user roles.

### Social Logins
- **Providers**: Google, GitHub, Microsoft
- **OAuth 2.0 Authentication**: Seamless integration with popular social login providers to enhance user login experience.

### JWT Authentication
- **Security**: Utilizes JSON Web Tokens (JWT) for secure authentication and authorization.
- **Session Management**: Efficiently manages user sessions with token-based authentication.

### MongoDB Integration
- **Database**: Designed and managed database schemas for efficient data handling.
- **Indexing**: Implemented indexing to improve query performance.

### Caching
- **Redis**: Implemented Redis for caching frequently accessed data, enhancing performance and scalability.

## Technologies Used
- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB**: NoSQL database for storing application data.
- **Passport.js**: Authentication middleware for Node.js to implement OAuth strategies.
- **Redis**: In-memory data structure store for caching.
- **JWT**: JSON Web Tokens for secure user authentication.
- **OAuth 2.0**: Open standard for access delegation used by Google, GitHub, and Microsoft.

## Project Structure
- **config/**: Configuration files for Passport.js and environment variables.
- **controllers/**: Logic for handling requests and responses.
- **middleware/**: Custom middleware for authentication and RBAC.
- **models/**: Mongoose schemas and models for MongoDB.
- **routes/**: Express routes for handling API endpoints.

## Setup and Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/kartik2433/backend-rbac-social-login.git
   cd backend-rbac-social-login
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Environment Variables**:
    Create a .env file in the root of your project and add the following variables:
    ```bash
    PORT=5000
    MONGODB_URI=your-mongodb-uri
    JWT_SECRET=your-jwt-secret
    GOOGLE_CLIENT_ID=your-google-client-id
    GOOGLE_CLIENT_SECRET=your-google-client-secret
    GITHUB_CLIENT_ID=your-github-client-id
    GITHUB_CLIENT_SECRET=your-github-client-secret
    MICROSOFT_CLIENT_ID=your-microsoft-client-id
    MICROSOFT_CLIENT_SECRET=your-microsoft-client-secret
    REDIS_HOST=your-redis-host
    REDIS_PORT=your-redis-port
    REDIS_PASSWORD=your-redis-password
    ```

4. **Run the Application**:
    ```bash
    npm start
    ```