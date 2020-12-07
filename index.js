const fs = require('fs');

(async function(){
  const rawInputs = await fetchInputs();
  const inputArray = inputToArray(rawInputs);
  const res = findTrees(inputArray);
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

function findTrees(arr) {
  let xUnits = 3;
  let yUnits = 1;

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