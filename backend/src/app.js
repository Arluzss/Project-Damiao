const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/AuthRoutes');

const moedaRoutes = require('./routes/moedaRoutes');
const app = express();

// permitir header Authorization para requests CORS do frontend
app.use(cors({ origin: true, allowedHeaders: ['Content-Type', 'Authorization'] }));
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/moedas', moedaRoutes);
module.exports = app; 