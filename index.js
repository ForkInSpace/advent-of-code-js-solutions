const fs = require('fs');

(async () => {
  const rawInputs = await fetchInputs();
  const parsed = toArray(rawInputs);
  const res = calculateSumOfTheCounts(parsed);
  console.log(res);
})()

function fetchInputs() {
  return new Promise((resolve, reject) => {
    fs.readFile('./input', 'utf-8', (err, data) => {
      if (err) return reject(err);

      resolve(data);
    })
  })
}

const toArray = (input) => {
  const arr = input.split(/\n\s*\n/);
  return arr.map(a => a.replace(/\n/g, ' ').split(' '))
}

const calculateSumOfTheCounts = (answers) => {
  return answers
    .map(answer => parseAnswer(answer))
    .reduce((oldVal, newVal) => oldVal + newVal);
}

const parseAnswer = (answer) => {
  const split = answer.map(i => i.split(''))
  const flat = split.flat();

  // remove dublicates
  const res = flat
    .filter((answer, indx) => 
      flat.indexOf(answer) === indx
    );
    
  return res.length;
}