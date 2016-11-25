import fs from 'fs';
//import fetch from 'node-fetch';
import request from 'sync-request';
import _ from 'lodash';

export default () => {

  const path = __dirname+'/pokemons';
  const dataUrlBase = 'https://pokeapi.co/api/v2/pokemon';
  const dataPathBase = '/api/v2/pokemon';
  const max = 811;

  for (let i=1; i<=max; i++) {
    const fileName = `${path}/${i}.json`;
    if (!fs.existsSync(fileName)) {
      const dataUrl = `${dataUrlBase}/${i}/`;
      console.log(`Downloading #${i} from ${dataUrl}`);
      const res = request('GET', dataUrl, {
        'headers': {
          //'user-agent': 'example-user-agent'
          'authority': 'pokeapi.co',
          'method': 'GET',
          'path': `/api/v2/pokemon/${i}`,
          'scheme': 'https',
          'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, sdch, br',
          'accept-language': 'ru-RU,ru;q=0.8,en-US;q=0.6,en;q=0.4',
          'cache-control': 'no-cache',
          'cookie': '__cfduid=d41afe35afd5ad224682bc37e64369b231478531567; _ga=GA1.2.409585211.1478545163',
          'pragma': 'no-cache',
          'upgrade-insecure-requests': '1',
          'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/53.0.2785.143 Chrome/53.0.2785.143 Safari/537.36'

        }
      });
      console.log(`Parsing #${i}!`);
      const data = JSON.parse(res.getBody());
      console.log(`Saving #${i}!`);
      fs.writeFileSync(fileName, JSON.stringify(data));
      return
    } else {
      console.log(`Cached #${i}!`);
    }
  }

}
