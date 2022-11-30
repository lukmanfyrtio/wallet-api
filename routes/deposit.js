const express = require('express')
const router = express.Router();
const db = require('../db.js')

let response = {
    timestamp: new Date().getTime(),
    code: 500,
    message: "Something Wrong"
}

function isNumeric(value) {
    var validNumber = new RegExp(/^\d*\.?\d*$/);
    return validNumber.test(value);
}


router.post('/deposit', async function (req, res) {
    const body = req?.body;
    const amount = body?.amount;
    const userid = body?.userId;

    if (amount == null || amount === undefined || amount === "") {
        response.code = 400;
        response.message = "amount field is required"
    } else if (!isNumeric(amount)) {
        response.code = 400;
        response.message = "amount must be number"
    } else if (userid === null || userid === undefined) {
        response.code = 400;
        response.message = "userId field is required"
    } else {
        const accounts = await db.eq(`select * from accounts where id = '${userid}'`)

        if (accounts.length == 0) {
            response.code = 400;
            response.message = `userId : ${userid} not found. Please try again.`
            res.status(response.code).send(response)
            return
        } else {
            let balance = parseFloat(parseFloat(amount) + parseFloat(accounts[0].balance))

            const updateData = await db.execute(`update accounts set balance=? where id = ?`, [balance, userid])
            console.log(parseFloat(amount)+" - "+ accounts[0].balance+" = "+balance)
            if (updateData.affectedRows == 1) {

                response.message = `Deposit successful! You have ${balance} in your account.`
                response.code = 200;
            } else {
                response.code = 400;
                response.code = "Deposit failed. Please try again."
            }
        }
    }

    res.status(response.code).send(response)
});


module.exports = router;