const { pgPool } = require('../config/database');

exports.testPgConnection = async (req, res) => {
    try {
        const result = await pgPool.query('SELECT NOW() as current_time');
        res.json({
            message: 'PostgreSQL Connection Test',
            currentTime: result.rows[0].current_time
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
