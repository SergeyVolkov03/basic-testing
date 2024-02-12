// Uncomment the code below and write your tests
import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';
import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';

describe('doStuffByTimeout', () => {
  const callback = jest.fn();

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, 1000);
    expect(global.setTimeout).toBeCalledWith(callback, 1000);
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(callback, 1000);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, 1000);
    expect(global.setInterval).toHaveBeenCalledWith(callback, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, 1000);
    jest.advanceTimersByTime(5000);
    expect(callback).toBeCalledTimes(5);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = 'file.txt';
    jest.spyOn(path, 'join');
    await readFileAsynchronously(pathToFile);
    expect(path.join).toBeCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = 'file.txt';
    jest.spyOn(fs, 'existsSync').mockImplementation(() => false);
    const content = await readFileAsynchronously(pathToFile);
    expect(content).toBe(null);
  });

  test('should return file content if file exists', async () => {
    const pathToFile = 'file.txt';
    jest.spyOn(fs, 'existsSync').mockImplementation(() => true);
    jest
      .spyOn(fsPromises, 'readFile')
      .mockImplementation(() => Promise.resolve('hello'));
    const content = await readFileAsynchronously(pathToFile);
    expect(content).toBe('hello');
  });
});
