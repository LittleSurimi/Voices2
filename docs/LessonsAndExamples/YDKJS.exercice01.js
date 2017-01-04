//https://github.com/getify/You-Dont-Know-JS/blob/master/up%20%26%20going/ch1.md

const TAX = 0.08;
const PHONE = 89.90;
const ACCESORY = 19.99;
const KIT = PHONE + ACCESORY;
const MAX_SPENDING = 230;

var bankAccount = 450;
var amount = 0;

function calculateTax(item) {
    return item * TAX + item;
}

while (bankAccount > amount) {
    if (bankAccount > MAX_SPENDING) {
        amount = calculateTax(KIT);
        console.log('if');
    } else {
        amount = calculateTax(PHONE);
        console.log('else');
    }
    bankAccount = bankAccount - amount;
    console.log('total = $', amount.toFixed(2), 'balance = $', bankAccount.toFixed(2));
}
