//Import package HTTP Импорт модуля HTTP
const http = require('http');
//Import app.js in server.js. Подключение app.js к файлу сервера
const app = require('./app');
//returns a valid port, whether supplied as a number or a string. Возвращает действительный порт, независимо от того, указан ли он в виде числа или строки 
const normalizePort = val => {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
  };
  const port = normalizePort(process.env.PORT || '3000');
  app.set('port', port);
  //searches for the various errors and handles them appropriately. It is then saved in the server ищет различные ошибки и обрабатывает их соответствующим образом. Затем он сохраняется на сервере 
  const errorHandler = error => {
    if (error.syscall !== 'listen') {
      throw error;
     
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges.');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use.');
        process.exit(1);
        break;
      default:
        throw error;
    }
  };
  
//Creation of server  => function CreateServer
const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});
//an event listener is also registered, relating to the port or named pipe on which the server is running in the console. также регистрируется прослушиватель событий, относящийся к порту или именованному каналу, на котором сервер работает в консоли. 
server.listen(port);