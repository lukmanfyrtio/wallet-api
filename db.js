const db = require('mariadb')
const { conf } = require('./conf')

const pl = db.createPool(conf.db)
async function eq(q) {
    let cn, rw
    try {
        cn = await pl.getConnection()
        rw = await cn.query(q)
    } catch (err) {
        rw = err
    } finally {
        if (cn) cn.end()
        return rw
    }
}

async function execute(q,parameter) {
    let cn, rw
    try {
        cn = await pl.getConnection()
        rw = await cn.query(q,parameter)
    } catch (err) {
        rw = err
    } finally {
        if (cn) cn.end()
        return rw
    }
}

module.exports = { eq,execute }