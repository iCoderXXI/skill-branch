import express from 'express';
import cors from 'cors';
import testColors from './colorTest';

const app = express();
app.use(cors());
app.get('/task2A', function (req, res) {
  const a = req.query.a || 0;
  const b = req.query.b || 0;
  return res.send(''+(a*1+b*1));
});

const f2u = function(s) {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

app.get('/name2B', function (req, res) {
  let fullname = req.query.fullname || '';
  fullname = fullname.replace(/^\s*/,'').replace(/\s*$/,'').replace(/\s{2,}/g,' ');
  console.log('['+fullname+']');
  const re = /^[^0-9_\/]+$/;
  if (fullname && re.test(fullname)) {
    const f = fullname.split(' ');
    if (f.length == 1) {
      return res.send(f2u(f[0]));
    } else if (f.length == 2) {
      return res.send(`${f2u(f[1])} ${f2u(f[0][0])}.`);
    } if (f.length == 3) {
      return res.send(`${f2u(f[2])} ${f2u(f[0][0])}. ${f2u(f[1][0])}.`);
    }
  }
  return res.send('Invalid fullname');
});


app.get('/skb2D', function (req, res) {
  let color = "" + req.query.color;
  color = color.trim().toLowerCase().replace(/%20/g,' ') || '';
  console.log("\n\n---------------------------------------------\n");
  console.log(req.query, color);

  res.send(testColors(color, res));

});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
