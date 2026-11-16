
const pool = require("../config/db");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
    try {
        const { access_id, password } = req.body;

        if (!access_id || !password) {
            return res.status(400).json({
                message: "Access ID and password are required"
            });
        }

        const existing = await pool.query(
            "SELECT * FROM access_credentials"
        );

        if (existing.rows.length > 0) {
            return res.status(409).json({
                message: "Shared credentials already registered"
            });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        await pool.query(
            `INSERT INTO access_credentials (access_id, password_hash)
             VALUES ($1, $2)`,
            [access_id, passwordHash]
        );

        res.status(201).json({
            message: "Shared credentials registered successfully",
            access_id
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Registration failed"
        });
    }
};


const login = async (req, res) => {
    try {
        const { access_id } = req.body;

        if (!access_id) {
            return res.status(400).json({
                message: "Access ID is required"
            });
        }

        // Check whether the ID exists
        const result = await pool.query(
            "SELECT * FROM access_credentials WHERE access_id = $1",
            [access_id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Invalid Access ID"
            });
        }

        // Increment login count
        const updated = await pool.query(
            `UPDATE access_credentials
             SET login_count = login_count + 1
             WHERE access_id = $1
             RETURNING login_count`,
            [access_id]
        );

        // Record login history
        await pool.query(
            `INSERT INTO login_history (access_id, status)
             VALUES ($1, $2)`,
            [access_id, "success"]
        );

        res.status(200).json({
            message: "Login successful",
            access_id: access_id,
            total_logins: updated.rows[0].login_count
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Login failed"
        });
    }
};

const getLoginCounts = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT access_id, login_count
             FROM access_credentials
             ORDER BY created_at DESC`
        );

        res.status(200).json({
            users: result.rows
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Unable to fetch login counts"
        });
    }
};

module.exports = {
    register,
    login,
    getLoginCounts
};
