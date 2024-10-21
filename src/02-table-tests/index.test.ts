// Uncomment the code below and write your tests
import {  simpleCalculator, Action } from './index';

const testCases = [
  // Cases for Action Add
  { a: 1, b: 2, action: Action.Add, expected: 3, description: 'should add two numbers: ' }, 
  { a: 2, b: 2, action: Action.Add, expected: 4, description: 'should add two numbers: ' },
  { a: 3, b: 2, action: Action.Add, expected: 5, description: 'should add two numbers: ' },
  { a: 5, b: 6, action: Action.Add, expected: 11, description: 'should add two numbers: ' }, 
  { a: 10, b: 2, action: Action.Add, expected: 12, description: 'should add two numbers: ' },
  { a: 8, b: 7, action: Action.Add, expected: 15, description: 'should add two numbers: ' },
  // Cases for Action Subtract
  { a: 3, b: 1, action: Action.Subtract, expected: 2, description: 'should subtract two numbers: ' }, // 3 - 1 = 2
  { a: 5, b: 2, action: Action.Subtract, expected: 3, description: 'should subtract two numbers: ' }, // 5 - 2 = 3
  { a: 10, b: 3, action: Action.Subtract, expected: 7, description: 'should subtract two numbers: ' }, // 10 - 3 = 7
  { a: 7, b: 4, action: Action.Subtract, expected: 3, description: 'should subtract two numbers: ' }, // 7 - 4 = 3
  { a: 15, b: 6, action: Action.Subtract, expected: 9, description: 'should subtract two numbers: ' }, // 15 - 6 = 9
  { a: 20, b: 8, action: Action.Subtract, expected: 12, description: 'should subtract two numbers: ' }, // 20 - 8 = 12

  // Cases for Action Divide
  { a: 6, b: 2, action: Action.Divide, expected: 3, description: 'should divide two numbers: ' }, // 6 / 2 = 3
  { a: 10, b: 5, action: Action.Divide, expected: 2, description: 'should divide two numbers: ' }, // 10 / 5 = 2
  { a: 15, b: 3, action: Action.Divide, expected: 5, description: 'should divide two numbers: ' }, // 15 / 3 = 5
  { a: 18, b: 6, action: Action.Divide, expected: 3, description: 'should divide two numbers: ' }, // 18 / 6 = 3
  { a: 20, b: 4, action: Action.Divide, expected: 5, description: 'should divide two numbers: ' }, // 20 / 4 = 5
  { a: 30, b: 10, action: Action.Divide, expected: 3, description: 'should divide two numbers: ' }, // 30 / 10 = 3

  // Cases for Action Multiply
  { a: 2, b: 3, action: Action.Multiply, expected: 6, description: 'should multiply two numbers' }, // 2 * 3 = 6
  { a: 4, b: 5, action: Action.Multiply, expected: 20, description: 'should multiply two numbers' }, // 4 * 5 = 20
  { a: 6, b: 2, action: Action.Multiply, expected: 12, description: 'should multiply two numbers' }, // 6 * 2 = 12
  { a: 8, b: 4, action: Action.Multiply, expected: 32, description: 'should multiply two numbers' }, // 8 * 4 = 32
  { a: 10, b: 3, action: Action.Multiply, expected: 30, description: 'should multiply two numbers' }, // 10 * 3 = 30
  { a: 12, b: 6, action: Action.Multiply, expected: 72, description: 'should multiply two numbers' }, // 12 * 6 = 72

  // Cases for Action Exponentiate
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8, description: 'should exponentiate two numbers: ' }, // 2^3 = 8
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9, description: 'should exponentiate two numbers: ' }, // 3^2 = 9
  { a: 4, b: 2, action: Action.Exponentiate, expected: 16, description: 'should exponentiate two numbers: ' }, // 4^2 = 16
  { a: 5, b: 3, action: Action.Exponentiate, expected: 125, description: 'should exponentiate two numbers: ' }, // 5^3 = 125
  { a: 6, b: 2, action: Action.Exponentiate, expected: 36, description: 'should exponentiate two numbers: ' }, // 6^2 = 36
  { a: 7, b: 3, action: Action.Exponentiate, expected: 343, description: 'should exponentiate two numbers: ' }, // 7^3 = 343

  // Cases for invalid arguments (a, b)
  { a: null, b: 2, action: Action.Add, expected: null, description: 'should return null for invalid arguments: ' }, // Invalid data (null) for 'a'
  { a: undefined, b: 2, action: Action.Subtract, expected: null, description: 'should return null for invalid arguments: ' }, // Invalid data (undefined) for 'a'
  { a: "invalid", b: 2, action: Action.Divide, expected: null, description: 'should return null for invalid arguments: ' }, // Invalid data (string) for 'a'
  { a: {}, b: 2, action: Action.Multiply, expected: null, description: 'should return null for invalid arguments: ' }, // Invalid data (object) for 'a'
  { a: null, b: null, action: Action.Exponentiate, expected: null, description: 'should return null for invalid arguments: ' }, // Invalid data (null) for 'a' and 'b'
  { a: 5, b: null, action: Action.Divide, expected: null, description: 'should return null for invalid arguments: ' }, // Invalid data (null) for 'b'
  // Cases for invalid action
  { a: 2, b: 3, action: 'action-satisfaction', expected: null, description: 'should return null for invalid action: ' }, // Invalid action
  { a: 3, b: 2, action: [], expected: null, description: 'should return null for invalid action: ' }, // Invalid action
  { a: 4, b: 2, action: () => 3, expected: null, description: 'should return null for invalid action: ' }, // Invalid action
  { a: 5, b: 3, action: null, expected: null, description: 'should return null for invalid action: ' }, // Invalid action
  { a: 6, b: 2, action: '<>', expected: null, description: 'should return null for invalid action: ' }, // Invalid action
  { a: 7, b: 3, action: 5, expected: null, description: 'should return null for invalid action: ' }, // Invalid action
];

describe.each(testCases)('simpleCalculator', ({ a , b , action , expected, description }) => {
  test(`${description + a + action + b}`, () => {
    expect(simpleCalculator({a, b, action})).toBe(expected);
  });
});
