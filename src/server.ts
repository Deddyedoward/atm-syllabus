import * as http from 'http';
import atm from './atm';
import emitter from './event';
import { IUpdateBalanceEmitResponse } from './interface';
import menu from './menu';
import util from './util';

/**
 * -----------------------------------------------------------------------------------
 * Emitter
 * -----------------------------------------------------------------------------------
 * 
 */
const listenEmitter = async () => {
    emitter.on('transaction', (data: IUpdateBalanceEmitResponse) => {
        atm.updateTransactionHistory(data);
        atm.updateAccountBalance(data);
    })
}

const server = http.createServer(async (req, res) => {

    /**
     * --------------------------------------------------------------------------------
     * View Endpoint
     * --------------------------------------------------------------------------------
     * 
     */
    if(req.url === '/') {
        const homeView = await menu.homeView();
        return res.writeHead(200, { 'Content-Type': 'text/html' }).end(homeView);  
    }

    if(req.url === '/balance') {
        const balanceView = await menu.balanceView();
        return res.writeHead(200, { 'Content-Type': 'text/html' }).end(balanceView);  
    }

    if(req.url === '/deposit') {
        const depositView = await menu.depositView();
        return res.writeHead(200, { 'Content-Type': 'text/html' }).end(depositView);
    }

    if(req.url === '/withdraw') {
        const withdrawView = await menu.withdrawView();
        return res.writeHead(200, { 'Content-Type': 'text/html' }).end(withdrawView);
    }

    if(req.url === '/transfer') {
        const transferView = await menu.transferView();
        return res.writeHead(200, { 'Content-Type': 'text/html' }).end(transferView);
    }

    if(req.url === '/view-transaction') {
        const showTransaction = await menu.showTransactionView();
        return res.writeHead(200, { 'Content-Type': 'text/html' }).end(showTransaction);
    }

    if(req.url === '/download-transaction') {
        const downloadTransaction = await menu.downloadTransactionView();
        return res.writeHead(200, { 'Content-Type': 'text/html' }).end(downloadTransaction);
    }

    /**
     * ----------------------------------------------------------------------------------
     * API Endpoint
     * ----------------------------------------------------------------------------------
     * 
     */
    if(req.url === '/api/withdraw') {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            try {
              const params = JSON.parse(body);
              const withdraw = await atm.withdrawBalance(params.amount);
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify(withdraw));
            } catch (error) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end('Invalid JSON data');
            }
        });
    }

    if(req.url === '/api/deposit') {
        let bodyDeposit = '';

        req.on('data', (chunk) => {
            bodyDeposit += chunk.toString();
        });

        req.on('end', async () => {
            try {
                const params = JSON.parse(bodyDeposit);
                const withdraw = await atm.depositBalance(params.amount);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(withdraw));
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end('Invalid JSON data');
            }
        });   
    }

    if(req.url === '/api/transfer') {
        let bodyTransfer = '';

        req.on('data', (chunk) => {
            bodyTransfer += chunk.toString();
        });

        req.on('end', async () => {
            try {
                const params = JSON.parse(bodyTransfer);
                const withdraw = await atm.transfer(params.amount, params.account);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(withdraw));
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end('Invalid JSON data');
            }
        });
    }

    if(req.url === '/api/download') {
        const data = await atm.getTransactions();
        const result = util.convertJSONToCSV(data);

        res.setHeader('Content-Disposition', 'attachment; filename="transactions.csv"');
        res.setHeader('Content-Type', 'text/csv');
        res.end(result);
    }
})

const start = async () => {
    const port = 3000;
    await listenEmitter();

    server.listen(port, () => {
        console.log(`Server is running and listening at http://localhost:${port}`)
    })
}

start();