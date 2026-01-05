const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/AuthRoutes');
const profileRoutes = require('./routes/ProfileRoutes');

const moedaRoutes = require('./routes/moedaRoutes');
const feedbackRoutes = require('./routes/FeedbackRoutes');
const app = express();

// permitir header Authorization para requests CORS do frontend
app.use(cors({ origin: true, allowedHeaders: ['Content-Type', 'Authorization'] }));
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/moedas', moedaRoutes);
app.use('/feedback', feedbackRoutes);

module.exports = app; 