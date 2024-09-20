# MERN Chat Application

This is a full-stack chat application built using the MERN (MongoDB, Express, React, Node.js) stack. The application allows users to send and receive messages in real-time, with additional features such as emoji support, voice messages, and more.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)

## Features

- Real-time messaging with Socket.io
- Emoji support
- Voice messages
- User authentication
- Media uploads (using Cloudinary)
- Responsive design

## Installation

### Prerequisites

Make sure you have the following software installed on your machine:

- Node.js
- npm (Node Package Manager)
- MongoDB

### Backend Setup

1. Clone the repository:
    ```bash
    git clone git@github.com:faisalfz/MERN-Chat-App.git
    cd mern-chat-app/backend
    ```

2. Install backend dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the `backend` directory and add your environment variables:
    ```plaintext
    MONGO_URI=your_mongo_db_connection_string
    JWT_SECRET=your_jwt_secret
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    ```

4. Start the backend server:
    ```bash
    npm run dev
    ```

### Frontend Setup

1. Open a new terminal and navigate to the `frontend` directory:
    ```bash
    cd ../frontend
    ```

2. Install frontend dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the `frontend` directory and add your environment variables:
    ```plaintext
    VITE_API_URL=http://localhost:8000
    ```

4. Start the frontend development server:
    ```bash
    npm run dev
    ```

## Usage

Once both the backend and frontend servers are running, you can access the application in your browser at `http://localhost:5173`.

## Scripts

### Backend

- `npm run dev`: Starts the backend server using nodemon.

### Frontend

- `npm run dev`: Starts the development server with Vite.
- `npm run build`: Builds the frontend for production.
- `npm run lint`: Runs ESLint to check for linting errors.
- `npm run preview`: Previews the production build.

## Dependencies

### Backend

- bcryptjs
- cloudinary
- cookie-parser
- cors
- dotenv
- express
- jsonwebtoken
- mongoose
- multer
- socket.io
- uuid

### Frontend

- @emotion/react
- @emotion/styled
- @mui/icons-material
- @mui/material
- axios
- date-fns
- dotenv
- emoji-picker-react
- lodash
- react
- react-audio-voice-recorder
- react-dom
- react-icons
- react-router-dom
- socket.io-client

## Folder Structure

### Backend

backend-mern-chat/
├── public/temp
├── src/
│ ├── controllers/
│ ├── db/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── utils/
│ └── app.js
│ └── constants.js
│ └── index.js
├── .env
├── .gitignore
├── package.json
└── README.md

### Frontend

frontend-mern-chat/
├── public/
├── src/
│ ├── assets/
│ ├── components/
│ ├── context/
│ ├── environment/
│ ├── hooks/
│ ├── pages/
│ ├── utils/
│ └── App.css
│ └── App.jsx
│ └── index.css
│ └── main.jsx
├── .env
├── .gitignore
├── package.json
└── README.md

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.