const fs = require('fs');

(async function(){
  const rawInputs = await fetchInputs();
  const inputArray = inputToArray(rawInputs);
  const fuels = calcFuelRequredByEachModule(inputArray);
  const totalSum = sum(fuels);
  console.log(totalSum);
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

function calcFuelRequredByEachModule(args) {
  return args.map(moduleMass => {
    return Math.floor(moduleMass/3) - 2;
  })
}

function sum(moduleFuels) {
  return moduleFuels.reduce((total, fuel) => total + fuel);
}
