// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const bankAccount = getBankAccount(10);
    expect(bankAccount.getBalance()).toBe(10);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAccount = getBankAccount(10);
    expect(() => bankAccount.withdraw(15)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const bankAccount = getBankAccount(10);
    const bankAccountForTransfer = getBankAccount(0);
    expect(() => bankAccount.transfer(15, bankAccountForTransfer)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount = getBankAccount(10);
    expect(() => bankAccount.transfer(15, bankAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const bankAccount = getBankAccount(10);
    expect(bankAccount.deposit(5).getBalance()).toBe(15);
  });

  test('should withdraw money', () => {
    const bankAccount = getBankAccount(10);
    expect(bankAccount.withdraw(5).getBalance()).toBe(5);
  });

  test('should transfer money', () => {
    const bankAccount = getBankAccount(10);
    const bankAccountForTransfer = getBankAccount(0);
    expect(bankAccount.transfer(5, bankAccountForTransfer).getBalance()).toBe(
      bankAccountForTransfer.getBalance(),
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const bankAccount = getBankAccount(10);
    jest
      .spyOn(bankAccount, 'fetchBalance')
      .mockImplementation(() => Promise.resolve(15));
    const fetchBalance = await bankAccount.fetchBalance();
    expect(typeof fetchBalance).toBe('number');
    expect(fetchBalance).toBe(15);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const bankAccount = getBankAccount(10);
    jest
      .spyOn(bankAccount, 'fetchBalance')
      .mockImplementation(() => Promise.resolve(15));
    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance()).toBe(15);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const bankAccount = getBankAccount(10);
    jest
      .spyOn(bankAccount, 'fetchBalance')
      .mockImplementation(() => Promise.resolve(null));
    return expect(bankAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
