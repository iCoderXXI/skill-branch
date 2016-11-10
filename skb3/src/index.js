import express from 'express';
import cors from 'cors';
import canonize from './canonize';

const app = express();
app.use(cors());
app.get('/', (req, res) => {
  res.json({
    hello: 'JS World',
  });
});

app.get('/canonize', (req, res) =>  {
  const username = canonize(req.query.username);
  // return res.json({
  //   url: req.query.url,
  //   username,
  // });
  return res.send(username);
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
