const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'vinay',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to the database!');
});

app.post('/bookSeats', (req, res) => {
  const { seats } = req.body;

  const getSeatType = (seat) => {
    if (seat.includes('A')) {
      return 'Premium';
    }
    if (seat.includes('B')) {
      return 'Premium';
    }
    if (seat.includes('C')) {
      return 'Premium';
    }
    if (seat.includes('D')) {
      return 'Premium';
    }
    if (seat.includes('E')) {
      return 'Premium';
    }
    if (seat.includes('F')) {
      return 'Premium';
    } else {
      return 'Standard';
    }
  };

  const values = seats.map((seat) => [seat, getSeatType(seat)]);

  const query = 'INSERT INTO movietickects (seat_number, seat_type) VALUES ?';
  db.query(query, [values], (error, results) => {
    if (error) {
      console.error('Error inserting data:', error);
      res.status(500).send('Error booking seats');
    } else {
      console.log('Seats booked successfully');
      res.status(200).send('Seats booked successfully');
    }
  });
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
