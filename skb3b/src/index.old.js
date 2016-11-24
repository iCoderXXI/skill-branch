import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
//import canonize from './canonize';

const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';

/*
{
  "board":{
    "vendor":"IBM",
    "model":"IBM-PC S-100",
    "cpu":{
      "model":"80286",
      "hz":12000
    },
    "image":"http://www.s100computers.com/My%20System%20Pages/80286%20Board/Picture%20of%2080286%20V2%20BoardJPG.jpg",
    "video":"http://www.s100computers.com/My%20System%20Pages/80286%20Board/80286-Demo3.mp4"
  },
  "ram":{
    "vendor":"CTS",
    "volume":1048576,
    "pins":30
  },
  "os":"MS-DOS 1.25",
  "floppy":0,
  "hdd":[
    {
      "vendor":"Samsung",
      "size":33554432,
      "volume":"C:"
    },{
      "vendor":"Maxtor",
      "size":16777216,
      "volume":"D:"
    },{
      "vendor":"Maxtor",
      "size":8388608,
      "volume":"C:"
    }
  ],
  "monitor":null
}

*/

let pc = {};
console.log('Fetching JSON');
fetch(pcUrl)
  .then(async (res) => {
    console.log('Got it!');
    pc = await res.json();
    console.log(pc);

    const app = express();
    app.use(cors());

    function notFound(res) {
      res.status(404).send('Not Found');
    }

    app.get('/task3A', (req, res) => {
      res.json(pc);
    });

    // app.get('/task3A/length', (req, res) => {
    //   res.json(Object.keys(pc).length);
    // });

    app.get('/task3A/volumes', (req, res) => {
      if (pc.hdd) {
        const vols = {};
        pc.hdd.map( (item) => {
          if (vols[item.volume]) {
            vols[item.volume] += item.size;
          } else {
            vols[item.volume] = item.size;
          }
        });

        console.log(vols, typeof(vols), typeof(pc));

        Object.keys(vols).forEach( (key) => {
          vols[key] += 'B';
        })

        res.json(vols);
      } else {
        notFound(res);
      }
    });

    app.get('/task3A/:lvl1', (req, res) => {
      const p = req.params;
      if (pc[p.lvl1] !== undefined) {
        res.json(pc[p.lvl1]);
      } else {
        notFound(res);
      }
    });

    app.get('/task3A/:lvl1/:lvl2', (req, res) => {
      const p = req.params;
      if (
          p.lvl2 !== 'length' &&
          pc[p.lvl1] !== undefined &&
          pc[p.lvl1][p.lvl2] !== undefined
      ) {
        res.json(pc[p.lvl1][p.lvl2]);
      } else {
        notFound(res);
      }
    });

    app.get('/task3A/:lvl1/:lvl2/:lvl3', (req, res) => {
      const p = req.params;
      if (p.lvl3 !== 'length' &&
          pc[p.lvl1] !== undefined &&
          pc[p.lvl1][p.lvl2] !== undefined &&
          pc[p.lvl1][p.lvl2][p.lvl3] !== undefined
      ) {
        res.json(pc[p.lvl1][p.lvl2][p.lvl3]);
      } else {
        notFound(res);
      }
    });

    app.listen(3000, () => {
      console.log('Your app listening on port 3000!');
    });

  })
  .catch(err => {
    console.log('Чтото пошло не так:', err);
  });
