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

const possibleEyeColors = [
  'amb',
  'blu',
  'brn',
  'gry',
  'grn',
  'hzl',
  'oth'
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
  // TODO refactor the mess
  if (Object.keys(passport).every(e => requiredFields.includes(e) || e === 'cid')) {
    const validatedFields = [];

    Object.entries(passport)
      .forEach(entry => {
        const [key, value] = entry;
        
        switch (key) {
          case ('byr'):
            if (Number(value) <= 2002 && Number(value) >= 1920) {
              validatedFields.push(value);
            }
            break;
          case ('iyr'):
            if (Number(value) <= 2020 && Number(value) >= 2010) {
              validatedFields.push(value);
            }
            break;
          case ('eyr'):
            if (Number(value) <= 2030 && Number(value) >= 2020) {
              validatedFields.push(value);
            }
            break;
          case ('hgt'):
            if (value.includes('cm') && Number(value.split('cm')[0]) <= 193 && Number(value.split('cm')[0]) >= 150 ||
            value.includes('in') && Number(value.split('in')[0]) <= 76 && Number(value.split('in')[0]) >= 59)
              validatedFields.push(value);
            break;
          case ('hcl'):
            if (/^#[0-9a-f]{6}/i.test(value)) {
              validatedFields.push(value);
            }
            break;
          case ('ecl'):
            if (possibleEyeColors.includes(value)) {
              validatedFields.push(value);
            }
            break;
          case ('pid'):
            if (/^\d{9}$/.test(value)) {
              validatedFields.push(value);
            }
            break;
          default:
            break;
        }
      })
      return validatedFields.length >= 7;
  } else {
    return false;
  }
}

function validatePassports(passports, requiredFields) {
  return passports
    .filter(p => validatePassport(p, requiredFields))
    .length;
}