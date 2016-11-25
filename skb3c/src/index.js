import express from 'express';
import cors from 'cors';
import _ from 'lodash';

import getPokemonsData from './pokemon.js';

const pokemons = getPokemonsData().map(
  pokemon => { return {
    ...pokemon,
    name: pokemon.name.toLowerCase(),
    w2h: pokemon.weight / pokemon.height
  }}
);

const pokemonsByNames = _.orderBy(pokemons, ['name'], ['asc'] );
const pokemonsByHeightsASC = pokemons.slice().sort(
  (a,b) => {
    const hs = a.height*1-b.height*1;
    return hs!==0?hs:(a.name>b.name?1:(a.name<b.name?-1:0));
  }
);
const pokemonsByHeightsDESC = pokemons.slice().sort(
  (a,b) => {
    const hs = b.height*1-a.height*1;
    return hs!==0?hs:(a.name>b.name?1:(a.name<b.name?-1:0));
  }
);
const pokemonsByWeightsASC = pokemons.slice().sort(
  (a,b) => {
    const hs = a.weight*1-b.weight*1;
    return hs!==0?hs:(a.name>b.name?1:(a.name<b.name?-1:0));
  }
);
const pokemonsByWeightsDESC = pokemons.slice().sort(
  (a,b) => {
    const hs = b.weight*1-a.weight*1;
    return hs!==0?hs:(a.name>b.name?1:(a.name<b.name?-1:0));
  }
);
const pokemonsByW2HASC = pokemons.slice().sort(
  (a,b) => {
    const hs = a.w2h*1-b.w2h*1;
    return hs!==0?hs:(a.name>b.name?1:(a.name<b.name?-1:0));
  }
);
const pokemonsByW2HDESC = pokemons.slice().sort(
  (a,b) => {
    const hs = b.w2h*1-a.w2h*1;
    return hs!==0?hs:(a.name>b.name?1:(a.name<b.name?-1:0));
  }
);
const pokemonNames = _.map(pokemonsByNames, 'name');

const pokemonHugeASC = _.map(pokemonsByHeightsASC, 'name');
const pokemonHugeDESC = _.map(pokemonsByHeightsDESC, 'name');

//console.log(pokemonsByHeightsDESC.map(pokemon => ({name: pokemon.name, height: pokemon.height})));

//const pokemonsSorted = pokemons.sort((a,b) => a.name>b.name );

const app = express();
app.use(cors());

function notFound(res) {
  return res.status(404).send("Not Found");
}

app.get('/', (req, res) => {
  const q=req.query;
  const offset = q.offset*1 || 0;
  res.json(pokemonNames.slice(offset,offset+(q.limit*1 || 20)));
});

app.get('/huge', (req, res) => {
  const q=req.query;
  const offset = q.offset*1 || 0;
  const data = pokemonsByHeightsDESC.slice(offset,offset+(q.limit*1 || 20));
  res.json(_.map(data, 'name'));
});

app.get('/micro', (req, res) => {
  const q=req.query;
  const offset = q.offset*1 || 0;
  const data = pokemonsByHeightsASC.slice(offset,offset+(q.limit*1 || 20));
  res.json(_.map(data, 'name'));
});

app.get('/heavy', (req, res) => {
  const q=req.query;
  const offset = q.offset*1 || 0;
  const data = pokemonsByWeightsDESC.slice(offset,offset+(q.limit*1 || 20));
  res.json(_.map(data, 'name'));
});

app.get('/light', (req, res) => {
  const q=req.query;
  const offset = q.offset*1 || 0;
  const data = pokemonsByWeightsASC.slice(offset,offset+(q.limit*1 || 20));
  res.json(_.map(data, 'name'));
});

app.get('/angular', (req, res) => {
  const q=req.query;
  const offset = q.offset*1 || 0;
  const data = pokemonsByW2HASC.slice(offset,offset+(q.limit*1 || 20));
  res.json(_.map(data, 'name'));
});

app.get('/fat', (req, res) => {
  const q=req.query;
  const offset = q.offset*1 || 0;
  const data = pokemonsByW2HDESC.slice(offset,offset+(q.limit*1 || 20));
  res.json(_.map(data, 'name'));
});


app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
