const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

// Connect to the database
const port = process.env.PORT || 9090;
const databaseName = 'Ecolink';
const db_url = process.env.DB_URL || `mongodb://127.0.0.1:27017`;



mongoose.set('debug', true);
mongoose.Promise = global.Promise;

mongoose
  .connect(`${db_url}/${databaseName}`)
  .then(() => {
    console.log(`Connected to ${databaseName}`);
  })
  .catch(err => {
    console.log(err);
  });

// Create an Express app
const app = express();

// Use Morgan for logging
app.use(morgan('dev'));
//Parse JSON requests
app.use(express.json());

// Parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Load the user routes
const userRouter = require('./routes/userRoutes');
app.use('/api/users', userRouter);

// Start the server

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});