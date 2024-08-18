const querystring = require('querystring');
const mysql = require('mysql2');

// Create a connection to the MySQL database
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sanu212@',
    database: 'users'
});

con.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL for login!');
});

const loginHandler = (req, res) => {
    let data = '';

    req.on('data', chunk => {
        data += chunk.toString();
    });

    req.on('end', () => {
        const { email, password } = querystring.parse(data);

        const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
        con.query(sql, [email, password], (err, results) => {
            if (err) throw err;

            if (results.length > 0) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true }));
            } else {
                res.writeHead(401, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, message: 'Invalid credentials' }));
            }
        });
    });
};

module.exports = loginHandler;
