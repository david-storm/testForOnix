const http = require('http');

const options = {
    host: '127.0.0.1',
    port: 3000
};

const request = http.request(options);
request.end();

request.on('response', message => {
    message.on('data', chunk => {
        console.log(chunk.toString());
    });
});
