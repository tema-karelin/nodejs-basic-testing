// Uncomment the code below and write your tests
import {
  mockOne,
  mockTwo,
  mockThree,
  unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule = jest.requireActual<typeof import('./index')>('./index');

  return {
    __esModule: true,
    ... originalModule,
    mockOne: jest.fn(() => {}),
    mockTwo: jest.fn(() => {}),
    mockThree: jest.fn(() => {}),
  };
});



describe('partial mocking', () => {

  const mockedConsoleLog = jest.fn();
  global.console.log = mockedConsoleLog;



  afterAll(() => {
    jest.unmock('./index');
    mockedConsoleLog.mockRestore();
  });



  test('mockOne, mockTwo, mockThree should not log into console', () => {
    mockOne();
    mockTwo();
    mockThree();
    expect(mockedConsoleLog).not.toHaveBeenCalled();
    
  });

  test('unmockedFunction should log into console', () => {
    unmockedFunction();
    expect(mockedConsoleLog).toHaveBeenCalled();
    expect(mockedConsoleLog).toHaveBeenCalledTimes(1);
  });
});
