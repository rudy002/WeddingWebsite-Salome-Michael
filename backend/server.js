const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();
const router = require('./routes');

const app = express();
const PORT = process.env.PORT || 5001;

app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.status(200).send();
});


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.use(bodyParser.json());
app.use('/api', router);


// Endpoint pour récupérer des données depuis Airtable
app.get('/api/data', async (req, res) => {
  try {
    const response = await axios.get('https://api.airtable.com/v0/app47u6kE9RFEe6Ke/tblQ7UzdcK7JneN5A', {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  } 
});

// Route de test pour vérifier si le backend est connecté
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is connected!' });
});



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
