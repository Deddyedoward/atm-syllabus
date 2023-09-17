import { TransactionStatus, TypeTransactionEnum } from './enum';
import emitter from './event';
import { ITransactionResult, IUpdateBalanceEmitResponse, IUpdateBalanceRequest } from './interface';
import util from './util';

/**
 * Validate balance
 * @param balance 
 * @param amount 
 * @returns {boolean}
 */
const isBalanceSufficient = (balance: number, amount: number): boolean => {
    if (balance <= 0 || balance < amount) {
        return false;
    }
    return true;
}

/**
 * Update balance
 * @param input 
 * @returns 
 */
const updateBalance = async (input: IUpdateBalanceRequest): Promise<ITransactionResult> => {
    const accountData = await util.getAcountDataFile();
    const account = JSON.parse(accountData);
    const transactionData = {
        date: new Date(),
        amount: input.amount,
        type: input.type
    };

    if(input.type === TypeTransactionEnum.WITHDRAW) {
        const isHaveBalance = isBalanceSufficient(account.balance, input.amount);

        if(!isHaveBalance) {            
            console.error('Insufficient balance, please do deposit first.')
            emitter.emit('transaction', { ...transactionData, balance: account.balance, status: TransactionStatus.FAILED })
            return { status: TransactionStatus.FAILED };
        }

        account.balance -= Number(input.amount);
        emitter.emit('transaction', { ...transactionData, balance:account.balance, status: TransactionStatus.SUCCESS });
    }

    if(input.type === TypeTransactionEnum.TRANSFER) {
        const isHaveBalance = isBalanceSufficient(account.balance, input.amount);

        if(!isHaveBalance) {
            console.error('Insufficient balance, please do deposit first.')
            emitter.emit('transaction', { ...transactionData, accountNumber: input.accountNumber, balance: account.balance, status: TransactionStatus.FAILED })
            return { status: TransactionStatus.FAILED };
        }

        account.balance -= Number(input.amount);
        emitter.emit('transaction', { ...transactionData, accountNumber: input.accountNumber, balance:account.balance, status: TransactionStatus.SUCCESS });
    }

    if(input.type === TypeTransactionEnum.DEPOSIT) {
        account.balance += Number(input.amount);
        emitter.emit('transaction', { ...transactionData, balance:account.balance, status: TransactionStatus.SUCCESS });
    }
    
    return { status: TransactionStatus.SUCCESS };
}

/**
 * Update and store balance
 * @param input 
 */
const updateAccountBalance = async (input: IUpdateBalanceEmitResponse): Promise<void> => {
    let accountData = await util.getAcountDataFile();
    let account = JSON.parse(accountData);

    account.balance = input.balance;
    accountData = JSON.stringify(account);
    util.writeAccountBalance(accountData);
}

/**
 * Update and store history transaction
 * @param input 
 */
const updateTransactionHistory = async (input: IUpdateBalanceEmitResponse): Promise<void> => {
    let transactionData;
    let transaction;

    try {
        transactionData = await util.getTransactionFile();
        transaction = JSON.parse(transactionData);
    } catch(err) {
        transaction = [];   
    }

    transaction.push(input);
    transactionData = JSON.stringify(transaction);
    util.writeTransaction(transactionData);
}

/**
 * Get balance amount
 * @returns 
 */
const getBalance = async(): Promise<number> => {
    const accountData = await util.getAcountDataFile();
    const account = JSON.parse(accountData);

    return account.balance;
}

/**
 * Do withdraw balance
 * @param amount 
 * @returns 
 */
const withdrawBalance = async (amount: number): Promise<ITransactionResult> => {
    return await updateBalance({ amount, type: TypeTransactionEnum.WITHDRAW })
}

/**
 * Do deposit balance
 * @param amount 
 * @returns 
 */
const depositBalance = async(amount: number): Promise<ITransactionResult> => {
    return await updateBalance({ amount, type: TypeTransactionEnum.DEPOSIT })
}

/**
 * Do transfer funds
 * @param amount 
 * @param accountNumber 
 * @returns 
 */
const transfer = async(amount: number, accountNumber: string): Promise<ITransactionResult> => {
    return await updateBalance({ amount, type: TypeTransactionEnum.TRANSFER, accountNumber })
}

/**
 * Get all transactions
 * @returns 
 */
const getTransactions = async () => {
    let transactionData;
    let transaction;

    try {
        transactionData = await util.getTransactionFile();
        transaction = JSON.parse(transactionData);
    } catch(err) {
        transaction = [];   
    }
    return transaction;
}

export default {
    getBalance,
    withdrawBalance,
    updateTransactionHistory,
    updateAccountBalance,
    depositBalance,
    transfer,
    getTransactions
}