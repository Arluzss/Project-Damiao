const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/AuthRoutes');

const lojaController = require('./routes/lojaRoutes');

const offerRoutes = require('./routes/offer.routes');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/offers', offerRoutes);
app.use('/loja', lojaRoutes);
module.exports = app; 