import express from 'express';
import operators from './routes/operators';
import ctus from './routes/ctus';
import loadouts from './routes/loadouts'
import mongoose from 'mongoose';
import auth from './routes/auth';
import cors from 'cors';
import users from './routes/users';

import https from 'https';
import fs from 'fs';
import config from './config'

const app = express();

app.use(cors());

const port = 3000;


// Define t phe database connecton and connect to it.
// Errors awill be logged to the console.
// this would normally come from a config file

const connectionString = config.connectionString; // connects to my MongoDB

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

const options = {
  key: fs.readFileSync("ssl/lukelocal.key"),
  cert: fs.readFileSync("ssl/lukelocal.cert")
};



// Configuring the built-in express body parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use('/operators', cors());
app.use('/ctus', cors());
app.use('/loadouts', cors());

app.use('/operators', operators);
app.use('/ctus', ctus);
app.use('/loadouts', loadouts);

app.use('/users', users);
app.use('/auth', auth);


app.get('/', (req, res) =>
  res.send('Rainbow Six Siege Operators Database - Luke Browne 2020'));

app.all('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`
  });
});

app.listen(port, () => console.log(`Example app listening on ${port}!`))

https.createServer(options, app).listen(8080, () => 
  console.log('listening on 8080 too, don\'t forget the https'));
