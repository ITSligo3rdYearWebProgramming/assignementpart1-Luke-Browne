import express from 'express';

import operators from './routes/operators';
import mongoose from 'mongoose';

const app = express();

const port = 3000;


// Define the database connecton and connect to it.
// Errors awill be logged to the console.
// this would normally come from a config file

const connectionString = 'mongodb://localhost:27017/OperatorDB' // connects to my MongoDB

mongoose.connect(connectionString, {
  "useNewUrlParser": true,
  "useUnifiedTopology": true,
  'useCreateIndex' : true
}).
catch ( error => {
  console.log('Database connection refused' + error);
  process.exit(2);
})

const db = mongoose.connection;


db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
  console.log("DB connected")
});



// Configuring the built-in express body parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use('/operators', operators);



app.get('/', (req, res) =>
  res.send('Operators Database'));

app.all('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`
  });
});

app.listen(port, () => console.log(`Example app listening on 
  ${port}!`))
