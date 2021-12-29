function bubboSort(array) {
  const newArray = [...array];

  for (let i = 0; i < newArray.length; i++) {
    for (let j = 0; j < newArray.length; j++) {
      if (newArray[j] > newArray[j + 1]) {
        const temp = newArray[j];
        newArray[j] = newArray[j + 1];
        newArray[j + 1] = temp;
      }
    }
  }

  return newArray;
}

function bubboSort2(array) {
  const newArray = [...array];

  let i = newArray.length - 1;

  while (i > 0) {
    let pos = 0;

    for (let j = 0; j < newArray.length; j++) {
      if (newArray[j] > newArray[j + 1]) {
        pos = j;
        const temp = newArray[j];
        newArray[j] = newArray[j + 1];
        newArray[j + 1] = temp;
      }
    }

    i = pos;
  }

  return newArray;
}

function selectionSort(array) {
  const newArray = [...array];
  const len = newArray.length;
  let minIndex, temp;

  for (let i = 0; i < len - 1; i++) {
    minIndex = i;

    for (let j = i + 1; j < len; j++) {
      if (newArray[j] < newArray[minIndex]) {
        minIndex = j;
      }
    }

    temp = newArray[i];
    newArray[i] = newArray[minIndex];
    newArray[minIndex] = temp;
  }

  return newArray;
}

function insertionSort(array) {
  const newArray = [...array];
  for (let i = 0; i < newArray.length; i++) {
    const key = newArray[i];
    let j = i - 1;
    while (j >= 0 && newArray[j] > key) {
      newArray[j + 1] = newArray[j];
      j--;
    }

    newArray[j + 1] = key;
  }

  return newArray;
}

module.exports = {
  bubboSort,
  bubboSort2,
  selectionSort,
  insertionSort,
};
