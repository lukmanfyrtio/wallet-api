var express = require("express");
const witdrawRoutes = require('./routes/withdraw.js')
const depositRoutes = require('./routes/deposit.js')
const registerRoutes = require('./routes/register.js')
const balanceRoutes = require('./routes/balance.js')

var app = express();
const { conf } = require('./conf')

app.use(express.json())
app.use('/', registerRoutes,depositRoutes,witdrawRoutes,balanceRoutes)
app.listen(conf.port, () => {
    console.log(`Server running on port ${conf.port}`)
})