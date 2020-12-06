const fs = require('fs');

(async function(){
  const rawInputs = await fetchInputs();
  const inputArray = inputToArray(rawInputs);
  const res = validatePasswords(inputArray);
  console.log(res);
})()

function fetchInputs() {
  return new Promise((resolve, reject) => {
    fs.readFile('./input', 'utf-8', function(err, data) {
      if (err) return reject(err);

      resolve(data);
    })
  })
}

function inputToArray(content) {
  return content.split('\n');
}

function validatePasswords(arr) {
  return arr
    .map(item => {
      let range = item.split(' ')[0];
      let char = item.split(':')[0].split(' ')[1];
      let password = item.split(' ')[2];

      return tryMatch(password.trim(), char, range.split('-')[0], range.split('-')[1]);
    })
    .filter(item => !!item)
    .length;
}

function tryMatch(password, char, rangeStart, rangeEnd) {
  const para = password.split('')
  const res = para
    .map((letter, indx) => {
      return letter == char && indx+1 == rangeStart || letter == char && indx+1 == rangeEnd;
    })
    .filter(r => !!r);
  return res.length == 1;
}