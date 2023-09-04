import inquirer from 'inquirer';
import atm from "./atm.js";

const menuPrompts = async () => {
    let isEnd = false;

    while(!isEnd) {
        const answer = await inquirer.prompt({
            type: "list",
            name: "menu",
            message: "What do you want to do?",
            choices: [
                {
                    name: "view account balance",
                    value: "VIEW_ACCOUNT"
                },
                {
                    name: "withdraw cash",
                    value: "WITHDRAW_CASH"
                },
                {
                    name: "deposit cash",
                    value: "DEPOSIT_CASH"
                },
                {
                    name: "transfer cash",
                    value: "TRANSFER_CASH"
                },
            ]
        });

        switch(answer.menu) {
            case "VIEW_ACCOUNT":
                await atm.viewAccountBalance();
                break;
            case "WITHDRAW_CASH":
                isEnd = true;
                await withdrawPrompts();
                break;
            case "DEPOSIT_CASH":
                isEnd = true;
                await depositPrompts();
                break;
            case "TRANSFER_CASH":
                isEnd = true;
                await transferPrompts();
                break;
            default:
                break;
        }
    }
}

const withdrawPrompts = async() => {
    const answer = await inquirer.prompt({
        type: "input",
        name: "amount",
        message: "How much you want withdraw?",
        validate: atm.validateIsNumber
    });

    atm.withdrawBalance(answer.amount)
    menuPrompts()
}

const depositPrompts = async() => {
    const answer = await inquirer.prompt({
        type: "input",
        name: "amount",
        message: "How much you want deposit?",
        validate: atm.validateIsNumber
    });

    atm.depositBalance(answer.amount);
    menuPrompts();
}

const transferPrompts = async() => {    
    const answer = await inquirer.prompt([
        {
            type: "input",
            name: "amount",
            message: "How much you want deposit?",
            validate: atm.validateIsNumber
        },
        {
            type: "input",
            name: "destinationAccount",
            message: "Please enter destination account number?"
        }
    ]);

    atm.transferBalance(answer.amount, answer.destinationAccount);
    menuPrompts();
}

const initialPrompts = async () => {
    let isValid = false;
    
    while(!isValid) {
        const answer = await inquirer.prompt({
            type: "password",
            name: "pin",
            message: "Please enter a valid 4-digit PIN (default: 1234):"
        });

        if(atm.validatePin(answer.pin)) {
            isValid = true;
        } else {
            console.log('Invalid PIN. Please try again.')
        }
    }

    menuPrompts();
}

initialPrompts();