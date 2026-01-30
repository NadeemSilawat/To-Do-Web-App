const admin = require('firebase-admin');
const dotenv = require('dotenv');

dotenv.config();

// Check if we have service account details in env or a file
// For this setup, we'll try to read from env variables for security
// or assume a serviceAccountKey.json exists if env vars aren't full

const serviceAccount = {
    type: "service_account",
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined,
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL
};

try {
    if (serviceAccount.project_id && serviceAccount.private_key && serviceAccount.client_email) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
        console.log("Firebase Admin Initialized from Env");
    } else {
        // Fallback to local file if it exists (dev only)
        // admin.initializeApp({
        //   credential: admin.credential.applicationDefault() 
        // });
        // console.log("Firebase Admin Initialized from Application Default");
        console.warn("Firebase Admin credentials missing in .env");
    }
} catch (error) {
    console.error("Firebase Admin Initialization Error:", error);
}

module.exports = admin;
