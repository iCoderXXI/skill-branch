import canonize from './canonize';

const arr = [
  'https://telegram.me/skillbranch',
  'https://telegraqwem.me/skillbranch123',
  'https://Telegram.me/skillbranch',
  'https://telegram.me/Skillbranch',
  '//telegram.me/skillbranch',
  'http://telegram.me/skillbranch',
  'telegram.me/skillbranch',
  'skillbranch',
  '@skillbranch',
  'https://vk.com/skillbranch',
  'http://vk.com/skillbranch',
  'vk.com/skillbranch',
  'vk.com/skillbranch/w=wall-117903599_1076',
  'vk.com/skillbranch/profile',
];

arr.slice(0,20).forEach( (url) => {
  const username = canonize(url);
  console.log(username[5]);
})
