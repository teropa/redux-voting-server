import Server from 'socket.io';

export function startServer() {
  const io = new Server().attach(8090);
}
