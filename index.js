const fs = require('fs');

const rows = [...Array(128).keys()];
const columns = [...Array(9).keys()];

const seatIds = [];

(async () => {
  const rawInputs = await fetchInputs();
  const boardingPasses = toArray(rawInputs);
  await findAllSeats(boardingPasses);
  sortAndSpitOutTheHighestSeatId(seatIds);
})()

function fetchInputs() {
  return new Promise((resolve, reject) => {
    fs.readFile('./input', 'utf-8', (err, data) => {
      if (err) return reject(err);

      resolve(data);
    })
  })
}

const toArray = (content) => {
  return content.split('\n');
}

const findAllSeats = (boardingPasses) => {
  boardingPasses.map(pass => {
    findSeat(pass);
  })
}

const findSeat = (pass) => {
  const passIdArr = pass.split('');
  
  // deep copy arrays
  let localRows = JSON.parse(JSON.stringify(rows));
  let localColumns = JSON.parse(JSON.stringify(columns));

  let halfRows;
  let halfColumns;

  passIdArr.forEach(char => {
    switch (char) {
      case ('F'):
        halfRows = Math.floor(localRows.length / 2);
        localRows.splice(-halfRows);
        break;
      case ('B'):
        halfRows = Math.floor(localRows.length / 2);
        localRows.splice(0, halfRows);
        break;
      case ('L'):
        halfColumns = Math.floor(localColumns.length / 2);
        localColumns.splice(-halfColumns);
        break;
      case ('R'):
        halfColumns = Math.floor(localColumns.length / 2);
        localColumns.splice(0, halfColumns);
        break;
      default:
        break;
    }
  })
  return seatIds.push((localRows[0] * 8) + localColumns[0]);
}

const sortAndSpitOutTheHighestSeatId = (seatIds) => {
  let sorted = seatIds.sort((a, b) => a - b);
  console.log(sorted.pop());
}