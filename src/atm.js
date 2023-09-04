let balance = 50000;

/**
 * 
 * @param {integer} input 
 * @returns {boolean}
 */
const validateIsNumber = (input) => {
    return !isNaN(input);
}

/**
 * 
 * @param {*} pin
 * @returns {boolean}
 */
const validatePin = (pin) => {
    if(pin == 1234) {
        return true;
    }
    return false;
}

/**
 * 
 * @param {integer} amount 
 * @returns {boolean}
 */
const isBalanceSufficient = (amount) => {
    if (balance <= 0 || balance < amount) {
        console.log('Insufficient balance, please do deposit first.')
        return false;
    }

    return true;
}

/**
 * @returns {void}
 */
const viewAccountBalance = async () => {
    console.log('Your account balance:', balance);
}

/**
 * 
 * @param {integer} amount 
 * @returns {void}
 */
const withdrawBalance = async (amount) => {
    const isSufficient = isBalanceSufficient(amount)

    if(isSufficient) {
        balance -= Number(amount);
        console.log('You have withdraw:', amount)
        viewAccountBalance();
    }
}

/**
 * 
 * @param {integer} amount 
 * @returns {void}
 */
const depositBalance = async(amount) => {
    balance += Number(amount);
    console.log('You have deposit:', amount)
    viewAccountBalance();
}

/**
 * 
 * @param {integer} amount 
 * @param {*} destinationAccount 
 * @returns {void}
 */
const transferBalance = async(amount, destinationAccount) => {
    const isSufficient = isBalanceSufficient(amount)

    if(isSufficient) {
        balance -= Number(amount);
        console.log('Thank you, transfer is success to:', destinationAccount)
        viewAccountBalance();
    }
}

export default {
    validateIsNumber,
    validatePin,
    viewAccountBalance,
    withdrawBalance,
    depositBalance,
    transferBalance
}