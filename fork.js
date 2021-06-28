'use strict'

const http = require('http');
const util = require('util');

const child_process = require('child_process');





console.log(2%5);








process.exit();

const server = http.createServer((request, response) => {
    response.writeHead(200, {
        'Content-Type': 'application/json',
        'token': 'llf'
    });


    let log = {
        'timestamp': new Date().getTime(),
        'q': request.url,
        'headers': request.headers,
        'statusCode': response.statusCode
    }

    response.write(util.inspect(log));
    response.end();


});

server.listen(90, ['192.168.1.18', '127.0.0.1'], () => {
    console.log('server is runing 90 port, pid: ' + process.pid);
});


server.on('error', (err) => {
    console.log(err)
});