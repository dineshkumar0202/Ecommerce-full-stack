# E-commerce Full Stack Application

A complete e-commerce application with Node.js backend and modern frontend.

## Backend Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Ecommerce-full-stack
   ```

2. **Install backend dependencies**
   ```bash
   cd BACKEND
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the BACKEND directory:
   ```env
   PORT=2000
   DB=mongodb://mongodb://localhost:27017/
   ACTIVATION_SECRET=your_activation_secret_key_here
   JWT_SECRET=your_jwt_secret_key_here
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_app_password
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

### API Endpoints

#### Authentication
- `POST /api/user/register` - Register a new user
- `POST /api/user/login` - Login user
- `GET /api/user/profile` - Get user profile

#### Example Usage

**Register User:**
```bash
curl -X POST http://localhost:5000/api/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "contact": "1234567890"
  }'
```

**Login User:**
```bash
curl -X POST http://localhost:5000/api/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

## Features

- ✅ User Authentication (Register/Login)
- ✅ JWT Token Authentication
- ✅ Email Verification with OTP
- ✅ Password Encryption
- ✅ MongoDB Database
- ✅ Express.js REST API
- ✅ Nodemailer for emails

## Next Steps

1. **Frontend Development** - Create React/Vue.js frontend
2. **Product Management** - Add product CRUD operations
3. **Order Management** - Implement order processing
4. **Payment Integration** - Add payment gateway
5. **Admin Panel** - Create admin dashboard

## Tech Stack

- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JWT, bcryptjs
- **Email:** Nodemailer
- **Development:** Nodemon

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request 