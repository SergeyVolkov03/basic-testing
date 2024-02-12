// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  return {
    __esModule: true,
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    global.console.log = jest.fn();
    mockOne(), mockTwo(), mockThree();
    expect(global.console.log).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    global.console.log = jest.fn();
    unmockedFunction();
    expect(global.console.log).toHaveBeenCalled();
  });
});
