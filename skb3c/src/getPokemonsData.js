import fs from 'fs';
import _ from 'lodash';

export default () => {

  const path = __dirname+'/pokemon';

  const files = fs.readdirSync(path);
  const pokemon = [];
  files.forEach(file => {
    //console.log(file);
    let contents = fs.readFileSync(path+"/"+file);
    let jsonContent = JSON.parse(contents);
    const id = jsonContent.id || jsonContent.resource_uri.split('/')[4];
    pokemon.push({ id, name: jsonContent.name, height: jsonContent.height, weight: jsonContent.weight});
    if (jsonContent.name == 'aegislash-shield') {
      console.log({ id, name: jsonContent.name, height: jsonContent.height, weight: jsonContent.weight});
    }
    //console.log(id, jsonContent.name, jsonContent.height, jsonContent.weight);
    //console.log(jsonContent);
  });
  return pokemon;

}
