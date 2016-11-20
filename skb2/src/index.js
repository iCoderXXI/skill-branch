import express from 'express';
import cors from 'cors';
import hsl from 'hsl-to-hex';
import urldecode from 'urldecode';

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
  if (color && color.length>0) {
    const re6 = /^(#)?[0-9a-f]{2}[0-9a-f]{2}[0-9a-f]{2}$/i;
    const re3 = /^(#)?[0-9a-f][0-9a-f][0-9a-f]$/i;
    const reRGB = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/i;
    const reHSL = /hsl\(\s*(\d+)\s*,\s*(\d+(?:\.\d+)?%)\s*,\s*(\d+(?:\.\d+)?%)\)/i;
    if (re6.test(color)) {
      color = color.replace('#','');
      return res.send(`#${color}`);
    } else if (re3.test(color)) {
      color = color.replace('#','');
      let colorArray = color.split('');
      console.log(colorArray);
      const colors = [];
      colorArray.map( (element, index, array) => {
        colors.push(element);
        colors.push(element);
      })

      let ret = `#${colors.join('')}`;
      console.log(ret);
      return res.send(ret);
    } else if (reRGB.test(color)) {
      const match = reRGB.exec(color);
      const rgb2hex = [];
      for(let i=1; i<=3; i++) {
        if (!(match[i]>=0 && match[i]<=255)) {
          return res.send('Invalid color');
        } else {
          let hex = ('00'+(match[i]*1).toString(16).toLowerCase()).slice(-2);
          rgb2hex.push(hex);
        }
      }
      console.log(rgb2hex);

      let ret = `#${rgb2hex.join('')}`;
      console.log(ret);
      return res.send(ret);
    } else if (reHSL.test(color)) {
      const match = reHSL.exec(color);
      match[2] = match[2].replace('%','')
      match[3] = match[3].replace('%','')
      console.log(match);
      if (match[1]>255 || match[2]>100 || match[3]>100) {
        return res.send('Invalid color');
      }
      const ret = hsl(match[1], match[2], match[3]);
      console.log(ret);
      return res.send(ret);
    }
  }
  return res.send('Invalid color');
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
