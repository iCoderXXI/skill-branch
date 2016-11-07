import _ from 'lodash';
import fs from 'fs';
import md5 from 'md5';
import glob from 'glob';

const __TMP_PATH__ = '/tmp';
let cacheKeys = {};

//const cacheKeys = {};
const cachePath = function(key) {
  const md5hash = md5(key);
  return `${__TMP_PATH__}/node.js-${md5hash}.tmp`;
}

const cacheSaveKeys = function() {
  cacheIt('cacheKeys', cacheKeys, true);
}

const cacheClear = function(key) {
  if (cacheKeys[key]) {
    const filePath = cachePath(key);
    fs.unlink(filePath);
    delete(cacheKeys[key]);
    cacheSaveKeys();
  }
}

const cacheClearAll = function() {
  glob(`${__TMP_PATH__}/node.js-*.tmp`,function(err,files){
       if (err) throw err;
       files.forEach(function(item,index,array){
            console.log(item + " found");
       });
       // Delete files
       files.forEach(function(item,index,array){
            fs.unlink(item, function(err){
                 if (err) throw err;
                 console.log(item + " deleted");
            });
       });
  });
}

const cacheAddKey = function(key) {
  if (!cacheKeys[key]) {
    //console.log(cacheKeys);
    cacheKeys[key] = cachePath(key);
    cacheSaveKeys();
  }
}

const cacheIt = function(key, data, async = false) {
  if (key && data) {
    const filePath = cachePath(key);
    console.log(`Caching: ${key}`);
    if (!async) {
      fs.writeFileSync(filePath, JSON.stringify(data));
    } else {
      fs.writeFile(filePath, JSON.stringify(data));
    }
    if (key !== 'cacheKeys') {
      cacheAddKey(key);
    }
  }
}

const cacheGet = function(key) {
  const filePath = cachePath(key);
  if (key && fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath));
  }
  return false;
}

const cacheGetKeys = function() {
  return cacheKeys;
}

cacheKeys = cacheGet('cacheKeys') || {};

export { cacheClear, cacheIt, cacheGet, cacheClearAll, cacheGetKeys };
