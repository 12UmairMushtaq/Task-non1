const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// User Array
let users = ['ali','hamza'];
let Id = 1;

// Get all users
app.get('/users', (req, res) => {
    res.json(users);
});

// Post a new user
app.post('/users', (req, res) => {
    const user = { id: Id++, ...req.body };
    users.push(user);
    res.status(201).json(user);
});

// Get user by ID
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
});

// Update user by ID
app.put('/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    users[userIndex] = { id: parseInt(req.params.id), ...req.body };
    res.json(users[userIndex]);
});

// Delete user by ID
app.delete('/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    const deletedUser = users.splice(userIndex, 1);
    res.json(deletedUser[0]);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
