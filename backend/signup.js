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
    console.log('Connected to MySQL for signup!');
});

const signupHandler = (req, res) => {
    let data = '';

    req.on('data', chunk => {
        data += chunk.toString();
    });

    req.on('end', () => {
        const {name, email, password } = querystring.parse(data);

        const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        con.query(sql, [name, email, password], (err, result) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, message: 'Database error' }));
                return;
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true }));
        });
    });
};

module.exports = signupHandler;
