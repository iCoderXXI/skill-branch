import hsl from 'hsl-to-hex';

const testHEX3 = (color) => {
  //const re3 = /^(#)?[0-9a-f][0-9a-f][0-9a-f]$/i;
  const re3 = /^(#)?[0-9a-f]{3}$/i;
  if (re3.test(color)) {
    color = color.replace('#','');
    let colorArray = color.split('');
    console.log(colorArray);
    // const colors = [];
    // colorArray.map( (element, index, array) => {
    //   colors.push(element);
    //   colors.push(element);
    // })
    const colors = colorArray.map((v)=>v+v);

    let ret = `#${colors.join('')}`;
    console.log(ret);
    return ret;
  }
  return false;
}

const testHEX6 = (color) => {
  //const re6 = /^(#)?[0-9a-f]{2}[0-9a-f]{2}[0-9a-f]{2}$/i;
  const re6 = /^(#)?([0-9a-f]{2}){3}$/i;
  if (re6.test(color)) {
    color = color.replace('#','');
    return `#${color}`;
  }
  return false;
}

const testRGB = (color) => {
  const reRGB = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/i;
  if (reRGB.test(color)) {
    const match = reRGB.exec(color);
    const rgb2hex = [];
    for(let i=1; i<=3; i++) {
      if (!(match[i]>=0 && match[i]<=255)) {
        return res.send('Invalid color');
      } else {
        let hex = ('00'+(match[i]*1).toString(16).toLowerCase()).slice(-2);
        rgb2hex.push(hex);
      }
    }
    console.log(rgb2hex);

    let ret = `#${rgb2hex.join('')}`;
    console.log(ret);
    return ret;
  }
  return false;
}

const testHSL = (color) => {
  const reHSL = /hsl\(\s*(\d+)\s*,\s*(\d+(?:\.\d+)?%)\s*,\s*(\d+(?:\.\d+)?%)\)/i;
  if (reHSL.test(color)) {
    const match = reHSL.exec(color);
    match[2] = match[2].replace('%','')
    match[3] = match[3].replace('%','')
    console.log(match);
    if (match[1]>255 || match[2]>100 || match[3]>100) {
      return -1;
    }
    const ret = hsl(match[1], match[2], match[3]);
    console.log(ret);
    return ret;
  }
  return false;
}

export default (color) => {
  const tests = [testHEX3, testHEX6, testRGB, testHSL];

  if (color && color.length>0) {
    for(let i in tests) {
      let ret = tests[i](color);
      if (ret === -1) return 'Invalid color';
      if (ret) return ret;
    }
  }
  return 'Invalid color';
}
