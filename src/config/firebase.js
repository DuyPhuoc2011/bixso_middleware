const admin = require('firebase-admin');
const path = require('path');
require('dotenv').config();

const connectFirebase = () => {
    try {
        let serviceAccount;

        if (process.env.FIREBASE_SERVICE_ACCOUNT) {
            // Option 1: Read from environment variable (JSON string) - Best for production/CI
            try {
                serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
            } catch (e) {
                console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT environment variable');
                throw e;
            }
        } else if (process.env.FIREBASE_SERVICE_ACCOUNT_PATH) {
            // Option 2: Read from file path - Good for local development
            serviceAccount = require(path.resolve(process.env.FIREBASE_SERVICE_ACCOUNT_PATH));
        } else {
            throw new Error('Neither FIREBASE_SERVICE_ACCOUNT nor FIREBASE_SERVICE_ACCOUNT_PATH is defined in .env');
        }

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });

        console.log('Firebase Admin Initialized Successfully');
    } catch (err) {
        console.error('Firebase Initialization Error:', err.message);
    }
};

module.exports = { connectFirebase, admin };
