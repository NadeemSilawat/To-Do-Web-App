import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
import BoardView from './pages/BoardView';
import Login from './pages/Login';
import Register from './pages/Register';

import { isConfigValid } from './firebase';

function App() {
  if (!isConfigValid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-yellow-50 p-4">
        <div className="bg-white p-8 rounded shadow-md max-w-lg text-center border-l-4 border-yellow-400">
          <h2 className="text-2xl font-bold text-yellow-700 mb-4">Setup Required!</h2>
          <p className="text-gray-600 mb-4">
            It looks like you haven't configured your Firebase environment variables yet.
          </p>
          <div className="bg-gray-100 p-4 rounded text-left mb-4 overflow-auto">
            <p className="font-mono text-sm text-gray-700">
              Status: {import.meta.env.VITE_FIREBASE_API_KEY ? '✅ API Key found' : '❌ API Key missing'}<br />
              Status: {import.meta.env.VITE_FIREBASE_PROJECT_ID ? '✅ Project ID found' : '❌ Project ID missing'}
            </p>
          </div>
          <p className="text-sm text-gray-500">
            Refer to <span className="font-bold">walkthrough.md</span> in your artifacts for instructions.
            Once you fill the keys, save the files and the page will refresh automatically.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/board/:id"
            element={
              <PrivateRoute>
                <BoardView />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
