# To-Do Web App

A full-stack To-Do application with Board management, built using the MERN stack (MongoDB, Express, React, Node.js) and Firebase for authentication.

## Features

- **User Authentication**: Sign up and login using Firebase Authentication.
- **Board Management**: Create multiple boards to organize tasks.
- **Task Management**: Add, edit, delete, and move tasks within boards.
- **Drag & Drop**: (_Planned_) Intuitive drag-and-drop interface for tasks.
- **Dark/Light Mode**: (_Planned_) Theming support.

## Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Firebase SDK
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), Firebase Admin SDK

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas Account (or local MongoDB)
- Firebase Project

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/NadeemSilawat/To-Do-Web-App.git
cd To-Do-Web-App
```

### 2. Backend Setup (`server`)

1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` directory with the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   FIREBASE_PROJECT_ID=your_firebase_project_id
   FIREBASE_PRIVATE_KEY_ID=your_firebase_private_key_id
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----"
   FIREBASE_CLIENT_EMAIL=your_firebase_client_email
   FIREBASE_CLIENT_ID=your_firebase_client_id
   FIREBASE_CLIENT_CERT_URL=your_firebase_client_cert_url
   ```
   *Note: You get the Firebase Admin SDK credentials from Project Settings > Service Accounts in the Firebase Console.*

4. Start the server:
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:5000`.

### 3. Frontend Setup (`client`)

1. Open a new terminal and navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `client` directory with the following variables:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_API_URL=http://localhost:5000/api
   ```
   *Note: You get these config values from Project Settings > General > Your Apps in the Firebase Console.*

4. Start the development server:
   ```bash
   npm run dev
   ```
   The client will run on `http://localhost:5173`.

## Usage

1. Open your browser and go to `http://localhost:5173`.
2. Register or Login to access the dashboard.
3. Create a new Board and start managing your tasks!

## License

This project is open-source and available under the [MIT License](LICENSE).
