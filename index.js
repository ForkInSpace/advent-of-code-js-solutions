const fs = require('fs');

(async () => {
  const rawInputs = await fetchInputs();
  const parsed = toArray(rawInputs);
  calculateSumOfTheCounts(parsed);
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
  let res = answers
    .map(answer => parseAnswer(answer))
    .reduce((prev, current) => prev + current);
  console.log(res);
}



const parseAnswer = (answer) => {
  let count = 0;

  if (answer.length == 1) {
    count += answer[0].length;
  } else if (answer.every(letter => letter.length === 1) && answer.every(an => an === answer[0])) {
    count += answer[0].length;
  } else if (answer.every(an => an.length === 1) && !answer.every(an => an === answer[0])) {
    // Skip, nothing to count here
  } else if (!answer.every(letter => letter.length === 1) && !answer.every(an => an === answer[0])) {
    let splitAns = answer.map(a => a.split(''));
    let [first, ...rest] = splitAns
  
    let matches = first.filter(char => rest[0].includes(char));

    count += matches.length;
  } else {
    console.log('Something wrong with the answer group: ', answer);
  }
  return count;
}