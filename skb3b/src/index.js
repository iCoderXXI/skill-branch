import fetch from 'node-fetch';
import api from './api';

const dataUrl = 'https://gist.githubusercontent.com/isuvorov/55f38b82ce263836dadc0503845db4da/raw/pets.json';

let data = {};
console.log('Fetching JSON');
fetch(dataUrl)
  .then(async (res) => {
    console.log('Got it!');
    data = await res.json();
    data.pets = data.pets.sort((a,b) => a.id - b.id);
    //console.log(data);

    const app = api(data);

  })
  .catch(err => {
    console.log('Чтото пошло не так:', err);
  });
