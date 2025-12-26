const express = require('express');

const healthRoutes = require('./routes/AuthRoutes');

const app = express();

app.use(express.json());

app.use('/health', healthRoutes);

module.exports = app;