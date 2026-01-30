const admin = require('../config/firebase');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];

            // Verify token with Firebase Admin
            const decodedToken = await admin.auth().verifyIdToken(token);

            req.user = decodedToken;

            // Check if user exists in MongoDB, if not create/sync
            // This is a lazy-creation strategy or we can rely on a specific register endpoint
            // For now, let's attach the firebase info.
            // Ideally we fetch the mongo user here to have the _id available for relationships

            let user = await User.findOne({ firebaseUid: decodedToken.uid });

            if (!user) {
                // Option: Auto-create user if not found (simple syncing)
                user = await User.create({
                    firebaseUid: decodedToken.uid,
                    email: decodedToken.email,
                });
            }

            req.user = user; // Attach MongoDB user object
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };
