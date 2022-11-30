const conf = {
    port: 8080, 
    db: {
        host: 'localhost', 
        port: '3306', 
        database: 'wallet',
        user: 'root',
        password: 'Password123!',
        connectionLimit: 10
    }
}


module.exports = { conf }