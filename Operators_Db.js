import mongoose from 'mongoose';
import express from 'express';

const app = express();

const port = 3000

mongoose.connect('mongodb://localhost:27017/OperatorDB', {
  "useNewUrlParser": true,
  "useUnifiedTopology": true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('DB connected')
});

const opSchema = new mongoose.Schema({
  name: String
});

const Operator = mongoose.model('Operator', opSchema);

app.get('/', (req, res) => {

    res.send('Operator Database');
  })
  
  app.get('/addOperator/:name', (req, res) => {
  
    const anOperator = new Operator({ name: req.params.name });
  
    anOperator.save()
      .then((result) => res.send(`${req.params.name} saved to roster`))
      .catch((err) =>
        console.error(err));
  });
  
  app.listen(port, () => console.log(`Example app listening on 
    : ${port}!`))