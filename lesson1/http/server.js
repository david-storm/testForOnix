const http = require('http');

const port = 3000;

const server = http.createServer((request, response) => {
    response.statusCode = 200;
    response.write('Hello word');
    response.end();
});

server.on('connection', () => {
    console.log('Client is connected...');
});

server.listen(port, () =>{
    console.log('server listenning');
});
