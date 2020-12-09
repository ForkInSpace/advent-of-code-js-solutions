const fs = require('fs');

const requiredFields = [
  'byr',
  'iyr',
  'eyr',
  'hgt',
  'hcl',
  'ecl',
  'pid'
];

(async () => {
  const rawInputs = await fetchInputs();
  const arr = toArray(rawInputs);
  const passports = parseArr(arr);
  const result = validatePassports(passports, requiredFields);
  console.log(result);
})()

function fetchInputs() {
  return new Promise((resolve, reject) => {
    fs.readFile('./input', 'utf-8', (err, data) => {
      if (err) return reject(err);

      resolve(data);
    })
  })
}

function toArray(content) {
  const arr = content.split(/\n\s*\n/);
  return arr.map(a => a.replace(/\n/g, ' ').split(' '))
}

function parseArr(arr) {
  var mapped = {};
  const res = arr
    .map(field => {
      let initialValue = {};
      return field.reduce((mapped, i) => {
        return {
          ...mapped,
          [i.split(':')[0]]: i.split(':')[1]
        }
      }, initialValue)
    });
  return res;
}

function validatePassport(passport, requiredFields) {
  // refactor the mess
  if (Object.keys(passport).length == 8) {
    return true;
  } else if (Object.keys(passport).length == 7) {
    return Object
    .keys(passport)
    .every(e => {
      return requiredFields.includes(e)
    });
  } else {
    return false;
  }
}

function validatePassports(passports, requiredFields) {
  return passports
    .filter(p => validatePassport(p, requiredFields))
    .length;
}