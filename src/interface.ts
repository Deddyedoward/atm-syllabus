import { TransactionStatus, TypeTransactionEnum } from "./enum";

export interface IUpdateBalanceRequest {
    amount: number
    type: TypeTransactionEnum,
    accountNumber?: string
}

export interface IUpdateBalanceEmitResponse extends IUpdateBalanceRequest {
    date: Date
    balance: number
    status: string
}

export interface ITransactionResult {
    status: TransactionStatus;
}