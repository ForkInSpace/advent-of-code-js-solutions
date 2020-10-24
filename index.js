const fs = require("fs");

(async function () {
  const data = await fetchInputs();

  let result = loopAndModify(data);
  console.log(result);
})();

function fetchInputs() {
  return new Promise((resolve, reject) => {
    fs.readFile("./input", "utf-8", function (err, data) {
      if (err) return reject(err);

      resolve(data);
    });
  });
}

const getAllCodes = (data) => {
  return data.split(",").map(Number);
};

const getCodeChunks = (data) => {
  let chunks = [];
  while (data.length > 0) {
    chunks.push(data.splice(0, 4));
  }
  return chunks;
};

const loopAndModify = (data) => {
  let allCodes = getAllCodes(data);
  let chunks = getCodeChunks(getAllCodes(data));
  let chunkLength = chunks.length;
  let output = null;

  for (let indx = 0; indx < chunkLength; indx++) {
    let op = chunks[indx][0];
    let posOne = chunks[indx][1];
    let posTwo = chunks[indx][2];
    let posThree = chunks[indx][3];

    if (op == 1) {
      output = sum(allCodes[posOne], allCodes[posTwo]);
      allCodes.splice(posThree, 1, output);
    } else if (op == 2) {
      output = multiply(allCodes[posOne], allCodes[posTwo]);
      allCodes.splice(posThree, 1, output);
    } else if (op == 99) {
      return allCodes[0];
    }
    chunks = getCodeChunks([...allCodes]);
  }
};

function sum(x, y) {
  return x + y;
}

function multiply(x, y) {
  return x * y;
}