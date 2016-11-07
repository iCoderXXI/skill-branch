export default function canonize(url) {
  const re = new RegExp('(https?:)?(\/\/)?((telegram|vk|vkontakte)[^\/]*\/)?([a-zA-Z0-9]+)', 'i');
  const username = url.match(re);

  return `@${username[5]}`;
}
