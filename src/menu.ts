import atm from "./atm";

const homeView = async () => {
    return `
            <!DOCTYPE html>
            <html>
            <head>
            <title>Sample HTML Page</title>
            </head>
            <body>
                <h1>ATM Menus</h1>
                <ul>
                    <li><a href="/balance">View Balance</a></li>
                    <li><a href="/withdraw">Withdraw Cash</a></li>
                    <li><a href="/deposit">Deposit cash</a></li>
                    <li><a href="/transfer">Transfer Funds</a></li>
                    <li><a href="/view-transaction">View Transaction History</a></li>
                    <li><a href="/download-transaction">Download Transaction</a></li>
                </ul>
                </body>
            </html>
            `;
}

const depositView = async () => {
    return `
            <!DOCTYPE html>
            <html>
            <head>
            <title>Sample HTML Page</title>
            </head>
            <body>
                <h1>Deposit</h1>
                <div>
                    <label>Amount</label>
                    <input id="amount" type="text" name="amount">
                    <button id="submitButton">Submit</button>
                </div>
                <br>
                <a href="/">Welcome Screen</a>
                <script>
            async function fetchData() {
                const button = document.getElementById('submitButton')
                const amountInput = document.getElementById('amount')
                const amountValue = amountInput.value;
                const params = { amount: amountValue };

                const protocol = window.location.protocol;
                const host = window.location.host;

                // Construct the base URL
                const baseUrl = \`\${protocol}//\${host}\`;
                
                const response = await fetch(\`\${baseUrl}/api/deposit\`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(params)
                });    

                if(!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const responseData = await response.json(); 
                const headingElement = document.createElement('h1');
                headingElement.textContent = responseData.status; 
                document.body.appendChild(headingElement);
            }

            document.getElementById('submitButton').addEventListener('click', fetchData);
            </script>
            </body>
            </html>
            `;
}

const withdrawView = async() => {
    return `
            <!DOCTYPE html>
            <html>
            <head>
            <title>Sample HTML Page</title>
            </head>
            <body>
            <h1>Withdraw</h1>
            <div>
                <label>Amount</label>
                <input id="amount" type="text" name="amount">
                <button id="submitButton">Submit</button>
            </div>
            <script>
            async function fetchData() {
                const button = document.getElementById('submitButton')
                const amountInput = document.getElementById('amount')
                const amountValue = amountInput.value;
                const params = { amount: amountValue };

                const protocol = window.location.protocol;
                const host = window.location.host;

                // Construct the base URL
                const baseUrl = \`\${protocol}//\${host}\`;
                
                const response = await fetch(\`\${baseUrl}/api/withdraw\`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(params)
                });    

                if(!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const responseData = await response.json(); 
                const headingElement = document.createElement('h1');
                headingElement.textContent = responseData.status; 
                document.body.appendChild(headingElement);
            }

            document.getElementById('submitButton').addEventListener('click', fetchData);
            </script>
            </body>
            </html>
            `;
}

const transferView = async() => {
    return `
            <!DOCTYPE html>
            <html>
            <head>
            <title>Sample HTML Page</title>
            </head>
            <body>
            <h1>Transfer</h1>
            <div>
                <label>Account Number</label>
                <input id="account_number" type="text" name="account_number">
                <label>Amount</label>
                <input id="amount" type="text" name="amount">
                <button id="submitButton">Submit</button>
            </div>
            <script>
            async function fetchData() {
                const button = document.getElementById('submitButton')
                const amountInput = document.getElementById('amount')
                const amountValue = amountInput.value;
                const accountInput = document.getElementById('account_number')
                const accountValue = accountInput.value;
                const params = { amount: amountValue, account: accountValue };

                const protocol = window.location.protocol;
                const host = window.location.host;

                // Construct the base URL
                const baseUrl = \`\${protocol}//\${host}\`;
                
                const response = await fetch(\`\${baseUrl}/api/transfer\`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(params)
                });    

                if(!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const responseData = await response.json(); 
                const headingElement = document.createElement('h1');
                headingElement.textContent = responseData.status; 
                document.body.appendChild(headingElement);
            }

            document.getElementById('submitButton').addEventListener('click', fetchData);
            </script>
            </body>
            </html>
            `;
}

const balanceView = async () => {
    const data = await atm.getBalance();

    let htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
            <title>Sample HTML Page</title>
            </head>
            <body>
            <h1>Balance</h1>`;
            htmlContent += `<h3>Your balance: ${data}<h3>`;
            htmlContent += `
                </body>
                </html>
            `;

    return htmlContent;
}

const showTransactionView = async () => {
    const data = await atm.getTransactions();

    let htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
            <title>Sample HTML Page</title>
            </head>
            <body>
            <h1>View Transactions</h1>
            <a href="/api/download">Download as CSV</a>
            `;
            
        for(const row of data) {
            htmlContent += `<ul>`;
            htmlContent += `<li>Transaction Date: ${row.date}</li>`;
            htmlContent += `<li>Type: ${row.type}</li>`;
            htmlContent += `<li>Amount: ${row.amount}</li>`;
            htmlContent += `<li>Balance: ${row.balance}</li>`;
            htmlContent += `<li>Status: ${row.status}</li>`;
            htmlContent += `</ul>`;
        }

        return htmlContent += `
            </ul>
            </body>
            </html>
        `;
}

const downloadTransactionView = async() => {
    return `
            <!DOCTYPE html>
            <html>
            <head>
            <title>Sample HTML Page</title>
            </head>
            <body>
            <h1>Download</h1>
            <a href="/api/download">Download</a>
            </body>
            </html>
            `;
}

export default {
    homeView,
    depositView,
    withdrawView,
    transferView,
    balanceView,
    showTransactionView,
    downloadTransactionView
}