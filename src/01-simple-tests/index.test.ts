// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

type RawCalculatorInput = {
  a: unknown;
  b: unknown;
  action: unknown;
};

describe('simpleCalculator tests', () => {
  
  let args: RawCalculatorInput;
  beforeEach(() => {
    args = {
      a: 5,
      b: 4,
      action: undefined, 
    }
  })

  test('should add two numbers', () => {
    args.action = Action.Add;
    expect(simpleCalculator(args)).toBe(9);
  });

  test('should subtract two numbers', () => {
    args.action = Action.Subtract;
    expect(simpleCalculator(args)).toBe(1);
  });

  test('should multiply two numbers', () => {
    args.action = Action.Multiply;
    expect(simpleCalculator(args)).toBe(20);
  });

  test('should divide two numbers', () => {
    args.action = Action.Divide;
    expect(simpleCalculator(args)).toBe(1.25);
  });

  test('should exponentiate two numbers', () => {
    args.action = Action.Exponentiate;
    expect(simpleCalculator(args)).toBe(625);
  });

  test('should return null for invalid action', () => {
    args.action = '_';
    expect(simpleCalculator(args)).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const invalidArgument = {
      a: 'a',
      b: 'b',
      action: 5
    };
    expect(simpleCalculator(invalidArgument)).toBeNull();
  });
});
