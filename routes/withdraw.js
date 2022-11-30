const express = require('express')
const router = express.Router();
const db = require('../db.js')

function isNumeric(value) {
    var validNumber = new RegExp(/^\d*\.?\d*$/);
    return validNumber.test(value);
}

router.post('/withdraw', async function (req, res) {
    let response = {
        timestamp: new Date().getTime(),
        code: 500,
        message: "Something Wrong"
    }
    const body = req?.body;
    const userid = body?.userId;
    const amount = body?.amount;

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
            let balance = parseFloat(parseFloat(accounts[0].balance) - parseFloat(amount))

            console.log(parseFloat(amount)+" - "+ accounts[0].balance)
            if (balance < 0) {

                response.message = `Insufficient Balance.`
                response.code = 200;
                res.status(response.code).send(response)
                return
            }
            const updateData = await db.execute(`update accounts set balance=? where id = ?`, [balance, userid])
            if (updateData.affectedRows == 1) {

                response.message = `Withdraw  successful! You have withdrawed ${balance} in your account.`
                response.code = 200;
            } else {
                response.code = 400;
                response.code = "Withdraw  failed. Please try again."
            }
        }
    }

    res.status(response.code).send(response)
});


module.exports = router;