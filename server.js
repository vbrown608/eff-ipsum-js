import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import Model from './lib/markov';

const app = express();

const input = fs.readFileSync('./lib/training.txt', 'utf8');
const model = Model(input);

app.set('view engine', 'ejs');
app.set('view options', { layout: false });
app.use('/public', express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index', { ipsum: '' });
});

app.post('/', (req, res) => {
  res.render('index', { ipsum: model.generate(100) });
});

app.listen(process.env.PORT || 3000);

console.log('Listening on port: ' + (process.env.PORT || 3000));
