import path from 'path';
import fs from 'fs';

const getHtmlFile = async (fileName: string) => {
    const file = path.join(__dirname, 'views', `${fileName}.html`);
    return fs.promises.readFile(file, 'utf-8');
}

const getAcountDataFile = async() => {
    const file = path.join(__dirname, 'data', 'data_account.json');
    return fs.promises.readFile(file, 'utf8');
}

const writeAccountBalance = async(data: any) => {
    const file = path.join(__dirname, 'data', 'data_account.json');
    return fs.promises.writeFile(file, data, 'utf8');
}

const getTransactionFile = async() => {
    const file = path.join(__dirname, 'data', 'transaction.json');
    return fs.promises.readFile(file, 'utf8');
}

const writeTransaction = async(data: any) => {
    const file = path.join(__dirname, 'data', 'transaction.json');
    return fs.promises.writeFile(file, data, 'utf-8');
}

function convertJSONToCSV(jsonData: any[]) {
    const csvRows: string[] = [];
    const header: string[] = Object.keys(jsonData[0]);
    csvRows.push(header.join(','));

    for (const row of jsonData) {
        const values: string[] = header.map((key) => row[key]);
        csvRows.push(values.join(','));
    }

    return csvRows.join('\n');
}

export default {
    getHtmlFile,
    getAcountDataFile,
    getTransactionFile,
    writeTransaction,
    writeAccountBalance,
    convertJSONToCSV
}