const mongoose = require('mongoose');

exports.testMongoConnection = async (req, res) => {
    try {
        const state = mongoose.connection.readyState;
        const status = {
            0: 'disconnected',
            1: 'connected',
            2: 'connecting',
            3: 'disconnecting',
        };
        res.json({
            message: 'MongoDB Connection Test',
            status: status[state] || 'unknown',
            dbName: mongoose.connection.name
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
