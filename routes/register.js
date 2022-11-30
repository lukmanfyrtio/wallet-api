const express = require('express')
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const db = require('../db.js')



function validateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return true
    }
    return false
}

router.post('/register', async function (req, res) {
    let response = {
        timestamp: new Date().getTime(),
        code: 500,
        message: "Something Wrong"
    }
    const body = req?.body;
    const firstName = body?.firstName;
    const lastName = body?.lastName;
    const email = body?.email;
    const password = body?.password;

    if (firstName === null || firstName === undefined) {
        response.code = 400;
        response.message = "firstName field is required"
    } else if (lastName === null || lastName === undefined) {
        response.code = 400;
        response.message = "lastName field is required"
    } else if (email === null || email === undefined) {
        response.code = 400;
        response.message = "email field is required"
    } else if (!validateEmail(email)) {
        response.code = 400;
        response.message = "You have entered an invalid email address!"
    } else if (password === null || password === undefined) {
        response.code = 400;
        response.message = "password field is required"
    }
    else {
        const emailDuplicate = await db.eq(`select * from accounts where email = '${email}'`)
        if (emailDuplicate.length > 0) {
            response.code = 400;
            response.message = "E-mail already existed. Please try again."
        } else {
            let userId = uuidv4();
            const res = await db.execute(`insert into accounts (id,firstname,lastname,email,password,balance)
    values(?,?,?,?,?,?)`, [userId, firstName, lastName, email, password, 0])
            if (res.affectedRows == 1) {
                response.data = {
                    userId: userId,
                }
                response.code = 200;
                response.message = "You have created your Wallet account!"
            }
        }

    }

    res.status(response.code).send(response)
});


module.exports = router;