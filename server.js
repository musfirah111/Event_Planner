require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

connectDB();
const app = express();
app.use(express.json());

app.use('/api/events', require('./routes/eventRout'));

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
