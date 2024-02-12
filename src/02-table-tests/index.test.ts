// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 2, b: 3, action: Action.Add, expected: 5 },
  { a: 2, b: 3, action: Action.Subtract, expected: -1 },
  { a: 2, b: 3, action: Action.Multiply, expected: 6 },
  { a: 4, b: 2, action: Action.Divide, expected: 2 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 2, b: 3, action: 'invalid action', expected: null },
  {
    a: 'invalid value',
    b: 'invalid value',
    action: Action.Add,
    expected: null,
  },
];

describe('simpleCalculator', () => {
  it.each(testCases)(
    `Expected that a action b = expected`,
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
