// Uncomment the code below and write your tests
import {
  resolveValue,
  throwError,
  throwCustomError,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const data = await resolveValue(1);
    expect(data).toBe(1);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => throwError('error')).toThrow('error');
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(new MyAwesomeError());
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    return expect(rejectCustomError).rejects.toThrow(new MyAwesomeError());
  });
});
