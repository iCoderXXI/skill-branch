import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.get('/task2A', function (req, res) {
  const a = req.query.a || 0;
  const b = req.query.b || 0;
  return res.send(''+(a*1+b*1));
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
