'use strict';

/* ------------------------------------------------------------------------------------------------
CHALLENGE 1 - Review

Write a function named transformToLis that, given an object, returns an array of the key value pairs as html list items.

For example:
{
  name: 'bob',
  age: 32
}

Becomes:
[
<li>name: bob</li>,
<li>age: 32</li>
]
------------------------------------------------------------------------------------------------ */

function transformToLis(obj){
  const items = [];

  for (const [key, value] of Object.entries(obj)) {
    const item = document.createElement('li');
    item.textContent = `${key}: ${value}`;
    items.push(item.outerHTML);
  }

  return items;
}
/* ------------------------------------------------------------------------------------------------
CHALLENGE 2

Write a function named count that, given an integer and an array of arrays, uses either filter, map, or reduce to count the amount of times the integer is present in the array of arrays.

Note: You might need to use the same method more than once.

For example, count(5, [[1, 3, 5, 7, 9], [5, 5, 5], [1, 2, 3]]) returns 4.
------------------------------------------------------------------------------------------------ */

const count = (target, input) => {
  return input.reduce((count, arr) => {
    return count + arr.filter(num => num === target).length;
  }, 0);
};


/* ------------------------------------------------------------------------------------------------
CHALLENGE 3

Write a function that, given an array of integer arrays as input, calculates the total sum of all the elements in the array.

You may want to use filter, map, or reduce for this problem, but are not required to. You may need to use the same method more than once.

For example, [[1, 2, 3, 4, 5], [6, 7, 2, 4, 5, 7], [9, 2, 3, 6,]] returns 66.
------------------------------------------------------------------------------------------------ */

const totalSum = (input) => {
  return input.reduce((sum, arr) => {
    return sum + arr.reduce((arrSum, num) => {
      return arrSum + num;
    }, 0);
  }, 0);
};


/* ------------------------------------------------------------------------------------------------
CHALLENGE 4

Write a function named divisibleByFiveTwoToThePower that accepts an array of arrays as input.

This function should first remove any elements that are not numbers or are not divisible by five.

This function should then raise 2 to the power of the resulting numbers, returning an array of arrays.

For example, [ [0,2,5,4], [2,4,10], [] ] should return [ [1, 32], [1024], [] ].
------------------------------------------------------------------------------------------------ */

const divisibleByFiveTwoToThePower = (input) => {
  return input.map(arr => {
    return arr.filter(num => {
      return typeof num === 'number' && num % 5 === 0;
    }).map(num => {
      return Math.pow(2, num);
    });
  });
};

/* ------------------------------------------------------------------------------------------------
CHALLENGE 5

Write a function named findMaleAndFemale that, given the Star Wars data, below,
returns the names of the characters whose gender is either male or female.

The names should be combined into a single string with each character name separated by "and".

For example, "C-3PO and Luke Skywalker".
------------------------------------------------------------------------------------------------ */

let starWarsData = [{
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'blue',
  birth_year: '19BBY',
  gender: 'male',
},
{
  name: 'C-3PO',
  height: '167',
  mass: '75',
  hair_color: 'n/a',
  skin_color: 'gold',
  eye_color: 'yellow',
  birth_year: '112BBY',
  gender: 'n/a'
},
{
  name: 'R2-D2',
  height: '96',
  mass: '32',
  hair_color: 'n/a',
  skin_color: 'white, blue',
  eye_color: 'red',
  birth_year: '33BBY',
  gender: 'n/a'
},
{
  name: 'Darth Vader',
  height: '202',
  mass: '136',
  hair_color: 'none',
  skin_color: 'white',
  eye_color: 'yellow',
  birth_year: '41.9BBY',
  gender: 'male'
},
{
  name: 'Leia Organa',
  height: '150',
  mass: '49',
  hair_color: 'brown',
  skin_color: 'light',
  eye_color: 'brown',
  birth_year: '19BBY',
  gender: 'female'
}];

let findMaleAndFemale = (data) => {
  // Filter the data to only include male or female characters
  let filteredData = data.filter((character) => {
    return character.gender === 'male' || character.gender === 'female';
  });

  // Map the filtered data to only include the character names
  let characterNames = filteredData.map((character) => {
    return character.name;
  });

  // Join the character names into a single string separated by "and"
  let result = characterNames.join(' and ');

  return result;
};

/* ------------------------------------------------------------------------------------------------
CHALLENGE 6

Write a function named findShortest that, given the Star Wars data from Challenge 6, uses any combination of filter, map and reduce to return the name of the character who is the shortest in height.
------------------------------------------------------------------------------------------------ */

let findShortest = (data) => {
  // First, use map to transform each object into an array with two elements: the character's name and height.
  // We parse the height as a number so that we can compare it later.
  let nameAndHeight = data.map(character => [character.name, parseInt(character.height)]);
  
  // Next, use reduce to find the name of the character with the shortest height.
  let shortest = nameAndHeight.reduce((currentShortest, character) => {
    // If the current character is shorter than the current shortest, replace it.
    if (character[1] < currentShortest[1]) {
      return character;
    }
    // Otherwise, keep the current shortest.
    else {
      return currentShortest;
    }
  }, ["", Infinity]);
  
  // Finally, return just the name of the shortest character.
  return shortest[0];
};

// Example usage:
let shortestCharacter = findShortest(starWarsData);
console.log(shortestCharacter);  // "R2-D2"



/* ------------------------------------------------------------------------------------------------
TESTS

All the code below will verify that your functions are working to solve the challenges.

DO NOT CHANGE any of the below code.

Run your tests from the console: jest challenges-10.test.js

------------------------------------------------------------------------------------------------ */

describe('Testing challenge 1', () => {
  test('It should return a list of key value pairs inside of li tags', () => {
    expect(transformToLis({name: 'bob', age: 32})[0]).toStrictEqual(`<li>name: bob</li>`);
    expect(transformToLis({name: 'bob', age: 32})[1]).toStrictEqual(`<li>age: 32</li>`);
    expect(transformToLis({})).toStrictEqual([]);
  });
});

describe('Testing challenge 2', () => {
  test('It should return the number of times the input is in the nested arrays', () => {
    expect(count(5, [[1, 3, 5, 7, 9], [5, 5, 5], [1, 2, 3]])).toStrictEqual(4);
    expect(count(3, [[1, 3, 5, 7, 9], [5, 5, 5], [1, 2, 3]])).toStrictEqual(2);
    expect(count(12, [[1, 3, 5, 7, 9], [5, 5, 5], [1, 2, 3]])).toStrictEqual(0);
  });
  test('It should work on empty arrays', () => {
    expect(count(5, [[1, 3, 5, 7, 9], [], [5, 5, 5], [1, 2, 3], []])).toStrictEqual(4);
    expect(count(5, [])).toStrictEqual(0);
  });
});

describe('Testing challenge 3', () => {
  test('It should add all the numbers in the arrays', () => {
    const nums = [[1, 2, 3, 4, 5], [6, 7, 2, 4, 5, 7], [9, 2, 3, 6,]];

    expect(totalSum(nums)).toStrictEqual(66);
  });
});

describe('Testing challenge 4', () => {
  test('It should return numbers divisible by five, then raise two to the power of the resulting numbers', () => {
    expect(divisibleByFiveTwoToThePower([[10, 20, 5, 4], [5, 6, 7, 9], [1, 10, 3]])).toStrictEqual([[1024, 1048576, 32], [32], [1024]]);
  });

  test('It should return an empty array if none of the numbers are divisible by five', () => {
    expect(divisibleByFiveTwoToThePower([[1, 2, 3], [5, 10, 15]])).toStrictEqual([[], [32, 1024, 32768]]);
  });

  test('It should return an empty array if the values are not numbers', () => {
    expect(divisibleByFiveTwoToThePower([['one', 'two', 'five'], ['5', '10', '15'], [5]])).toStrictEqual([[], [], [32]]);
  });
});

describe('Testing challenge 5', () => {
  test('It should return only characters that are male or female', () => {
    expect(findMaleAndFemale(starWarsData)).toStrictEqual('Luke Skywalker and Darth Vader and Leia Organa');
    expect(findMaleAndFemale([{ name: 'person', gender: 'female' }, { gender: 'lol' }, { name: 'persontwo', gender: 'male' }])).toStrictEqual('person and persontwo');
  });
});

describe('Testing challenge 6', () => {
  test('It should return the name of the shortest character', () => {
    expect(findShortest(starWarsData)).toStrictEqual('R2-D2');
  });
});
