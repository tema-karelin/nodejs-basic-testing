// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

import { existsSync } from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout').mockImplementation();
    const callback = () => {};
    const time = 1000;
    doStuffByTimeout(callback, time);
    expect(setTimeoutSpy).toBeCalled();
    expect(setTimeoutSpy).toHaveBeenCalledWith(callback, time);
    setTimeoutSpy.mockRestore();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const time = 1000;
    doStuffByTimeout(callback, time);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(time);
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
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
    const setIntervalSpy = jest
      .spyOn(global, 'setInterval')
      .mockImplementation();
    const callback = () => {};
    const time = 1000;
    doStuffByInterval(callback, time);
    expect(setIntervalSpy).toBeCalled();
    expect(setIntervalSpy).toHaveBeenCalledWith(callback, time);
    setIntervalSpy.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn(); // mock callback
    const time = 1000;
    const iterations = 5; //
    doStuffByInterval(callback, time); // call the function
    expect(callback).not.toHaveBeenCalled();
    for (let i = 0; i < iterations; i++) {
      jest.advanceTimersByTime(time); // advance timer
      expect(callback).toHaveBeenCalledTimes(i + 1);
    }
  });
});

// check why it does not work if will be in describe block
jest.mock('fs');
jest.mock('path');
jest.mock('fs/promises');

describe('readFileAsynchronously', () => {



  const testPath = '/testPath';

  test('should call join with pathToFile', async () => {
    
    const joinSpy = jest.spyOn(path, 'join');
    await readFileAsynchronously(testPath);
    expect(joinSpy).toHaveBeenCalledWith(expect.any(String), testPath);

  });

  test('should return null if file does not exist', async () => {

    (existsSync as jest.Mock).mockReturnValueOnce(false);
    const result = await readFileAsynchronously(testPath);
    expect(result).toBeNull();

  });

  test('should return file content if file exists', async () => {
    
    const innerFileData = 'test file inner data';
    (existsSync as jest.Mock).mockReturnValueOnce(true);
    (fsPromises.readFile as jest.Mock).mockReturnValueOnce(innerFileData);
    const result = await readFileAsynchronously(testPath);
    expect(result).not.toBeNull();
    expect(result).toEqual(innerFileData);

  });
});
