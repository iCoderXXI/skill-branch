export default function canonize(url) {
  //let re, pos;
  //re = new RegExp('(https?:)?(\/\/)?([w|W]{3}\.)?((telegram|vk|vkontakte|twitter|github)[^\/]*\/)?([a-zA-Z0-9]+)/', 'i');
  //pos = 6;
  //const username = url.match(re);
  //console.log(username);
  const ue = url
                .replace(/(http:\/\/)/i,'')
                .replace(/(https:\/\/)/i,'')
                .replace(/(\/\/)/i,'')
                .replace(/(@)/i,'')
                .split('/');
  //console.log(ue);
  let username;
  if (ue.length>1) {
    username = ue[1];
  } else {
    username = ue[0];
  }

  return `@${username}`;
}
