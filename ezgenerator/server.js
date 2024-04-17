// server.js
const express = require('express');
const next = require('next');
const axios = require('axios');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const randomUserApi = "https://randomuser.me/api/";
const randomOthers = "https://randommer.io/";

app.prepare().then(() => {
  const server = express();

  server.get('/api/random-user', async (req, res) => {
    try {
      const { gender, nat } = req.query;
      const apiUrl = `${randomUserApi}?gender=${gender || 'all'}&nat=${nat || 'us'}`;
      
      const response = await axios.get(apiUrl);
      const data = response.data;
      res.json(data);
    } catch (error) {
      console.error('Error fetching random user:', error);
      res.status(500).send('Error fetching random user');
    }
  
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
