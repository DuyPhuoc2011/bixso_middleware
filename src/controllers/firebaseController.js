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
            articles.push({ id: doc.id, ...doc.data() });
        });

        res.status(200).json(articles);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { checkConnection, getArticles };
