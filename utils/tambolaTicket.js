// function printMatrix(matrix) {
//   for (let i = 0; i < matrix.length; i++) {
//     console.log(matrix[i].join("\t"));
//   }
// }
// printMatrix(sortedMatrix);

const generateTicket = () => {
  // Function to generate a random number within a range
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Function to generate 5 random unique indexes
  function generateRandomIndexes() {
    const indexes = [];
    while (indexes.length < 5) {
      const randomIndex = getRandomNumber(0, 8);
      if (!indexes.includes(randomIndex)) {
        indexes.push(randomIndex);
      }
    }
    return indexes;
  }

  // Compare two arrays and generate new array with numbers not present in any arrays
  function compareArrays(array1, array2) {
    const allNumbers = [...array1, ...array2];
    const uniqueNumbers = [...new Set(allNumbers)];

    let missingNumbers = [];
    for (let i = 0; i < 9; i++) {
      if (!uniqueNumbers.includes(i)) {
        missingNumbers.push(i);
      }
    }

    // Include missing numbers and additional random numbers in the new array
    let newArray = [...missingNumbers];
    while (newArray.length < 5) {
      let randomNumber = getRandomNumber(0, 8);
      if (!newArray.includes(randomNumber)) {
        newArray.push(randomNumber);
      }
    }

    return newArray;
  }

  // Function to create matrix with 0s and 1s
  function createZeroOneMatrix() {
    // Create an empty matrix filled with zeros
    const matrix = Array.from({ length: 3 }, () => Array(9).fill(0));

    let randomIndexes = [];
    for (let i = 0; i < 3; i++) {
      if (i === 2) {
        randomIndexes.push(compareArrays(randomIndexes[0], randomIndexes[1]));
      } else {
        randomIndexes.push(generateRandomIndexes());
      }
    }

    // Fill the matrix with ones at the random indexes
    randomIndexes.forEach((indexes, rowIndex) => {
      indexes.forEach((index) => {
        matrix[rowIndex][index] = 1;
      });
    });

    return matrix;
  }

  // Function to generate unique numbers based on column's index
  function generateUniqueNumber(j, arr) {
    let randomNumber;
    do {
      if (j === 0) {
        randomNumber = getRandomNumber(1, 9);
      } else if (j === 8) {
        randomNumber = getRandomNumber(80, 90);
      } else {
        randomNumber = getRandomNumber(j * 10, (j + 1) * 10 - 1);
      }
    } while (arr.includes(randomNumber));
    return randomNumber;
  }

  // Fill matrix with specified values
  function fillWithValues() {
    const matrix = createZeroOneMatrix();
    const addedNums = [];
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        let number;
        // Filling non zero values with random unique numbers specified
        if (matrix[i][j]) {
          number = generateUniqueNumber(j, addedNums);
          matrix[i][j] = number;
          addedNums.push(number);
        }
      }
    }
    return matrix;
  }

  function sortColumns(matrix) {
    // Transpose the matrix to get an array of columns
    const columns = matrix[0].map((_, columnIndex) =>
      matrix.map((row) => row[columnIndex])
    );

    const sortedColumns = columns.map((column) => {
      // Filter out zero values
      const nonZeroValues = column.filter((value) => value !== 0);
      // Sort non-zero values
      const sortedValues = nonZeroValues.sort((a, b) => a - b);
      // Map the original column, replacing non-zero values with the sorted values
      const sortedColumn = column.map((value) =>
        value !== 0 ? sortedValues.shift() : value
      );
      return sortedColumn;
    });

    // Transpose the sorted columns back into rows
    const sortedMatrix = sortedColumns[0].map((_, rowIndex) =>
      sortedColumns.map((column) => column[rowIndex])
    );

    return sortedMatrix;
  }

  return sortColumns(fillWithValues());
};

// const generateTickets = (n) => {
//   const ticket = [];
//   for (let i = 0; i < n; i++) {
//     ticket.push(createTicket());
//   }
//   console.log(ticket);
// };

module.exports = generateTicket;
