import http from 'http';
// import greeter from './greeter';


const port = 8080;

const server = http
  .createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    // res.end(greeter.hello);
  })
  .listen(port);

server.on('listening', () => console.log('Server is listening on port', server.address()));