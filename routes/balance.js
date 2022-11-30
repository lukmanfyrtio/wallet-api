const express = require('express')
const router = express.Router();
const db = require('../db.js')
let response = {
    timestamp: new Date().getTime(),
    code: 500,
    message: "Something Wrong"
}

router.get('/balance', async function (req, res) {
    const body = req?.body;
    const userid = body?.userId;
    if (userid === null || userid === undefined) {
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
            response.code = 200;
            response.data = accounts[0]
            response.message="Success"
        }
    }
    res.status(response.code).send(response)
});


module.exports = router;