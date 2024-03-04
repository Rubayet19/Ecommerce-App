# E-Commerce Mobile App

## Introduction
This e-commerce mobile app is a cross-platform solution designed for online shopping. Built with the MERN stack (MongoDB, Express.js, React Native, and Node.js), it offers a seamless shopping experience on both iOS and Android devices.

## Features
- User authentication and profile management
- Product browsing and search functionality
- Shopping cart and checkout system
- Order tracking and history
- Responsive design for tablets and smartphones

## Technology Stack
- **Frontend**: React Native
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Other Technologies**: Redux for state management, JWT for authentication

## Installation

This section guides you through setting up the E-commerce App on your local development environment.

### Prerequisites

- Node.js and npm installed on your machine
- MongoDB set up locally or remotely (MongoDB Atlas recommended)

### Steps

1. **Clone the Repository**

   Start by cloning the project to your local machine:

   ```bash
   git clone https://github.com/Rubayet19/Ecommerce-App.git
   cd Ecommerce-App
   
2. **Set Up Backend**

   Navigate to the backend directory (if separate) and install dependencies:
   cd backend
   npm install

   Create a .env file in the backend directory. Add your MongoDB URI and any other environment variables required by the app:
   DATABASE_URI=mongodb+srv://your_mongodb_uri
   SECRET_KEY=your_secret_key

3. **Set Up Frontend**

   Navigate to the frontend directory (if separate) and install dependencies:
   
   cd ../frontend
   npm install

4. **Start server and client**
   - npm start // For server
   - npm run android // For client on Android
   - npm run ios // For client on iOS


## Usage
After installation, the app can be run on a simulator or physical device. Navigate through the app to explore different features such as signing up/in, adding products to the cart, and checking out.

## Contributing
We welcome contributions to improve the app. Please fork the repo, create a new branch for your contribution, and submit a pull request.


