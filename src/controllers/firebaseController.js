const { admin } = require('../config/firebase');

const checkConnection = async (req, res) => {
    try {
        // simple check: list users (requires permission) or just return success if admin is initialized
        // Since listing users might require specific IAM permissions, let's just check if the app is not null
        if (admin.apps.length > 0) {
            res.status(200).json({ message: 'Firebase is connected', appName: admin.app().name });
        } else {
            res.status(500).json({ message: 'Firebase is NOT connected' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const convertTimestamps = (data) => {
    if (data === null || data === undefined) return data;

    // Check if it's a Firestore Timestamp (has toDate method)
    if (typeof data.toDate === 'function') {
        return data.toDate().toISOString(); // or .toString() if you prefer
    }

    if (Array.isArray(data)) {
        return data.map(item => convertTimestamps(item));
    }

    if (typeof data === 'object') {
        const newData = {};
        for (const key in data) {
            newData[key] = convertTimestamps(data[key]);
        }
        return newData;
    }

    return data;
};

const getArticles = async (req, res) => {
    try {
        const db = admin.firestore();
        const articlesRef = db.collection('articles');
        const snapshot = await articlesRef.get();

        if (snapshot.empty) {
            return res.status(200).json([]);
        }

        const articles = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            articles.push({
                id: doc.id,
                ...convertTimestamps(data)
            });
        });

        res.status(200).json(articles);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { checkConnection, getArticles };
