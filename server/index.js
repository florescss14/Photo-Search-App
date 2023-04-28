import express from 'express';
import axios from 'axios';
const app = express();
import { API_KEY } from './secrets.js'

  // Endpoint to retrieve curated photos
  app.get('/api/curated', (req, res) => {
    const { page, per_page } = req.query;
    axios.get(`https://api.pexels.com/v1/curated?page=${page}&per_page=${per_page}`, {
        headers: {
          Authorization: API_KEY,
        },
      })
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send('Error retrieving photos');
      });
  });

  // Endpoint to search for photos
  app.get('/api/search', (req, res) => {
    const { query, page, per_page } = req.query;
    axios.get(
        `https://api.pexels.com/v1/search?query=${query}&page=${page}&per_page=${per_page}`,
        {
          headers: {
            Authorization: API_KEY,
          },
        }
      )
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send('Error searching for photos');
      });
  });

  app.get('/api/path', (req, res) => {
    let { url } = req.query;
    url = decodeURIComponent(url);
    axios.get(
        url,
        {
          headers: {
            Authorization: API_KEY,
          },
        }
      )
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        //console.log(error);
        res.status(500).send('Error searching for photos');
      });
  });

  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

