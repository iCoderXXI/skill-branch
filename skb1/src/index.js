import express from 'express';
import fetch from 'isomorphic-fetch';
import Promise from 'bluebird';
import _ from 'lodash';
import {cacheClear, cacheIt, cacheGet, cacheClearAll, cacheGetKeys} from './fsCache';
//import canonize from './canonize';

const __DEV__ = true;

const app = express();

//cacheClearAll();

//console.log(cacheGetKeys());

// app.get('/canonize', (req, res) =>  {
//   const username = canonize(req.query.url);
//   return res.json({
//     url: req.query.url,
//     username,
//   });
// });

const baseUrl = 'https://pokeapi.co/api/v2';
const pokemonFields = [ 'id', 'name', 'base_experience', 'height', 'is_default', 'order', 'weight', ];
// pokemon
// pokemon/1

// async function getPokemons(url = `${baseUrl}/pokemon`, i = 0) {
//   const cachedPokemons = cacheGet(url);
//   if (i==0 && cachedPokemons) {
//     console.log('\n\ngetPokemons - cached', url, i);
//     return cachedPokemons;
//   }
//   console.log('\n\ngetPokemons', url, i);
//   const responce = await fetch(url);
//   const page = await responce.json();
//   const pokemons = page.results;
//   if (__DEV__ && i>1) {
//     cacheIt(url, pokemons);
//     return pokemons;
//   }
//   if (page.next) {
//     const morePokemons = await getPokemons(page.next, i+1);
//     const pokemons = [
//       ...pokemons,
//       ...morePokemons,
//     ];
//     cacheIt(url, pokemons);
//     return pokemons;
//   }
//   cacheIt(url, pokemons);
//   return pokemons;
// }


async function getPokemon(pokemonId) {
  if (pokemonId) {
    const url = `${baseUrl}/pokemon/${pokemonId}`;
    const cachedPokemon = cacheGet(url);
    if (cachedPokemon) {
      console.log('\n\ngetPokemon - cached', url);
      return cachedPokemon;
    }
    console.log('\n\ngetPokemon', url);
    const responce = await fetch(url);
    const pokemon = await responce.json();
    cacheIt(url, pokemon);
    return pokemon;
  } else {
    throw new Error('pokemonId is missing in getPokemon');
  }
}


app.get('/', async (req, res) => {
  try {
    // const pokemonsInfo = await getPokemons();
    // const pokemonsPromises = pokemonsInfo.slice(0,2).map( info => {
    //   console.log(info);
    //   if (info && info.url) {
    //     const pokemon = getPokemon(info.url);
    //     return pokemon;
    //   } else {
    //     return false;
    //   }
    // });


    const pokemonsPromises = [];
    for(let i=1; i<=811; i++) {
      pokemonsPromises[i] = await getPokemon(i);
    }

    const pokemonsFull = await Promise.all(pokemonsPromises);
    const pokemons = pokemonsFull.map( pokemon => {
      return _.pick(pokemon, pokemonFields)
    });
    const sortedPokemons = _.sort(pokemons, pokemon => pokemon.weight);

    return res.json(pokemons);
  } catch(err) {
    console.log(err);
    return res.json({ err });

  }
});


// app.get('/', (req, res) =>  {
//   return res.json({
//     qwe: 'qweqwe',
//   });
// });

app.listen(3000, () => {
  console.log('Listening on port 3000.');
});
