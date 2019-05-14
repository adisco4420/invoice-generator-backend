const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserRoutes = require('./routes/UserRoutes');
const port = process.env.PORT || 6004; 
const app = express();
const env = require('./env');
// Connect to MongoDB
mongoose
  .connect(env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('✌🏾 Successfully connected to MongoDB');
  })
  .catch(err => {
    console.log('An error occured while conencting to MongoDB', err);
  });


app.use(cors());

// Add middlewares for parsing JSON and urlencoded data and populating `req.body`
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use('/user', UserRoutes);
app.listen(port).on('listening', () => {
  console.log('We are live on ' + port);
});
