const express = require('express');
const app = express();
require('dotenv').config();

const connectDB = require('./config/db');

// middleware
app.use(express.json());
const cors = require('cors');
app.use(cors());
app.use(express.static('public'));

// connect DB
connectDB();


const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const blogRoutes = require('./routes/blogRoutes');
app.use('/api/blogs', blogRoutes);

// test route
app.get('/', (req, res) => {
    res.send('Blogging API Running ');
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});