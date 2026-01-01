const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/AuthRoutes');

const offerRoutes = require('./routes/offer.routes');
const moedaRoutes = require('./routes/moedaRoutes');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/offers', offerRoutes);
app.use('/moedas', moedaRoutes);
module.exports = app; 