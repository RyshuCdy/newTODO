require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false, // Disable SSL
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Routes
app.get('/tasks', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM tasks ORDER BY created_at DESC');
        const tasks = result.rows;
        client.release();
        res.json(tasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.post('/tasks', async (req, res) => {
    try {
        const { description } = req.body;
        const client = await pool.connect();
        const result = await client.query('INSERT INTO tasks (description) VALUES ($1) RETURNING *', [description]);
        const newTask = result.rows[0];
        client.release();
        res.json(newTask);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
