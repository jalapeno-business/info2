const express = require('express');
const cors = require('cors');

const app = express();
const parser = require('body-parser');
const db = require('./db');

app.use(express.static(`${__dirname}/../client/dist`));

app.use(parser.json(), cors());


app.get('/api/restaurant/info/:id', (req, res) => {
  db.getRestaurantById(req.params.id, (error, result) => {
    if (error) {
      throw error;
    } else {
      res.send(result);
    }
  });
});



app.listen('1177', () => {
  console.log('listening on elevenseventyseven');
});
