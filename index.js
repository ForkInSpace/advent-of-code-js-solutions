const fs = require('fs');

(async function(){
  const rawInputs = await fetchInputs();
  const inputArray = inputToArray(rawInputs);
  const res = multipleSlopes(inputArray);
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
  const arr = content.split('\n');
  result = arr.map(str => str.split(''));
  return result;
}

function singleSlope(arr, xUnits, yUnits) {

  let numberOfTrees = 0;
  let x = 0;
  let y = 0;
  
  while (y < arr.length) {
    const adjustedX = x % arr[0].length;
    const coordinate = arr[y][adjustedX];

    if (coordinate === '#') { 
      numberOfTrees++;
    }

    x += xUnits;
    y += yUnits;
  }

  return numberOfTrees;
}

function multipleSlopes(arr) {
  let xUnits = [1, 3 ,5 ,7, 1];
  let yUnits = [1, 1, 1, 1, 2];

  let numberOfTrees = new Array(5).fill(0);

  for (let i = 0; i < xUnits.length; i++) {
    let totalTrees = singleSlope(arr, xUnits[i], yUnits[i]);

    numberOfTrees[i] = totalTrees;
  }
  
  return numberOfTrees.reduce((a, b) => a * b);
}