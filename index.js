const fs = require('fs');

(async function(){
  const rawInputs = await fetchInputs();
  const inputArray = inputToArrayOfInts(rawInputs);
  const res = compareNumbersInArr(inputArray);
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

function inputToArrayOfInts(content) {
  return content.split('\n').map(i => +i);
}

function compareNumbersInArr(args) {
  const sorted = sortArr(args);
  for (let i = 0; i < sorted.length; i++) {
    for (let j = sorted.length - 1; j >= 0; j--) {
      if (sum(sorted[i], sorted[j]) == 2020) {
        return multiply(sorted[i], sorted[j]);
      }
    }
  }
}

function sortArr(arr) {
  return arr.sort();
}

function sum(val1, val2) {
  return val1 + val2;
}

function multiply(val1, val2) {
  return val1 * val2;
}
