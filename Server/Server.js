import WebSocket, { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

let clients = []

wss.on('request', function (request) {
    var connection = request.accept('any-protocol', request.origin);
    console.log("her");
    clients.push(connection);
})

wss.on('connection', function connection(ws) {
    ws.on('message', function message(data, isBinary) {
        console.log("data", data.toString());
        //console.log(isBinary);
        if (data.toString().startsWith("hey")) {
            return 
        }
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(data.toString()), { binary: isBinary });
            }
        });

    });
});