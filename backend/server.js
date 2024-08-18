const http = require('http');
const fs = require('fs');
const path = require('path');
const loginHandler = require('./login');
const signupHandler = require('./signup');

const PORT = 2004;

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile(path.join(__dirname, '../frontend/login.html'), (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else if (req.url.startsWith('/login') && req.method === 'POST') {
        loginHandler(req, res);
    } else if (req.url.startsWith('/signup') && req.method === 'POST') {
        signupHandler(req, res);
    } else {
        fs.readFile(path.join(__dirname, '../frontend' + req.url), (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Not Found');
                return;
            }
            res.writeHead(200, { 'Content-Type': getContentType(req.url) });
            res.end(data);
        });
    }
});

const getContentType = (url) => {
    const ext = path.extname(url);
    switch (ext) {
        case '.html': return 'text/html';
        case '.css': return 'text/css';
        case '.js': return 'application/javascript';
        default: return 'application/octet-stream';
    }
};

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
