// Uncomment the code below and write your tests
import lodash from 'lodash';
import {
  BankAccount,
  getBankAccount,
  TransferFailedError,
  SynchronizationFailedError,
  InsufficientFundsError,
} from '.';

jest.mock('lodash');

describe('BankAccount', () => {
  let bank: BankAccount;
  const initialBalance = 30;
  beforeEach(() => {
    bank = getBankAccount(initialBalance);
  })

  test('should create account with initial balance', () => {
    expect(bank).toBeInstanceOf(BankAccount);
    expect(bank.getBalance()).toEqual(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => bank.withdraw(initialBalance + 10)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => bank.transfer(initialBalance + 10, new BankAccount(10))).toThrow();
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => bank.transfer(initialBalance + 10, bank)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const balance = bank.getBalance();
    const amount = 100;
    bank.deposit(amount);
    expect(bank.getBalance()).toBe(balance + amount);
  });

  test('should withdraw money', () => {
    const balance = bank.getBalance();
    const amount = 11;
    bank.withdraw(amount);
    expect(bank.getBalance()).toBe(balance - amount);
  });

  test('should transfer money', () => {
    const bank2Initial = 100;
    const bank2 = new BankAccount(bank2Initial);
    const amount = 15;
    const bankBalance = bank.getBalance();
    bank.transfer(amount, bank2);
    expect(bank.getBalance()).toBe(bankBalance - amount);
    expect(bank2.getBalance()).toBe(bank2Initial + amount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    (lodash.random as jest.Mock).mockReturnValue(1)
    expect(typeof await bank.fetchBalance()).toBe('number');

  });

  test('should set new balance if fetchBalance returned number', async () => {
    (lodash.random as jest.Mock).mockReturnValue(50);
    await bank.synchronizeBalance();
    expect(bank.getBalance()).toBe(50);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    (lodash.random as jest.Mock).mockReturnValue(0);
    // const response = await bank.synchronizeBalance();
    // expect(response).rejects.toThrow(new SynchronizationFailedError());

    try {
      await bank.synchronizeBalance();
    } catch (error) {
      expect(error).toBeInstanceOf(SynchronizationFailedError);
    }

    
  });
});
