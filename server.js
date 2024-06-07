const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Dummy data initialization
let users = {
    1: { name: 'vikram', balance: 5000 },
    2: { name: 'singh', balance: 3000 },
    3: { name: 'user3', balance: 7000 },
    4: { name: 'user4', balance: 8000 }
};
let userIdCounter = 5;  // Adjust to be one more than the highest user ID

// Create User API
app.post('/create_user', (req, res) => {
    const { name } = req.body;
    const userId = userIdCounter++;
    users[userId] = { name, balance: 0 };
    res.status(201).json({ userId, name });
});

// Deposit API
app.post('/deposit', (req, res) => {
    const { userId, amount } = req.body;
    if (users[userId]) {
        users[userId].balance += amount;
        res.status(200).json({ userId, newBalance: users[userId].balance });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// Withdraw API
app.post('/withdraw', (req, res) => {
    const { userId, amount } = req.body;
    if (users[userId]) {
        if (users[userId].balance >= amount) {
            users[userId].balance -= amount;
            res.status(200).json({ userId, newBalance: users[userId].balance });
        } else {
            res.status(400).json({ error: 'Insufficient funds' });
        }
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// Get Balance API
app.get('/get_balance/:userId', (req, res) => {
    const { userId } = req.params;
    if (users[userId]) {
        res.status(200).json({ userId,name:users[userId].name, balance: users[userId].balance });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// Send API
app.post('/send', (req, res) => {
    const { fromUserId, toUserId, amount } = req.body;
    if (users[fromUserId] && users[toUserId]) {
        if (users[fromUserId].balance >= amount) {
            users[fromUserId].balance -= amount;
            users[toUserId].balance += amount;
            res.status(200).json({ amount,fromUserId,fromUser:users[fromUserId].name, toUserId,toUser:users[toUserId].name, fromUserNewBalance: users[fromUserId].balance, toUserNewBalance: users[toUserId].balance });
        } else {
            res.status(400).json({ error: 'Insufficient funds' });
        }
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

app.listen(port, () => {
    console.log(`Banking service listening at http://localhost:${port}`);
});
