const server = require("./server/server")
const socketServer = require("./server/socketServer")
const router = require("./routing/route");
const requestLoginHandler = require("./requestHandlers/requestLoginHandler/requestLoginHandler")
const requestRegistrationHandler = require("./requestHandlers/requestRegistrationHandler/requestRegistrationHandler")
const requestCreateConnection = require("./requestHandlers/requestCreateConnection/requestCreateConnection")

handle = {}

handle['/'] = requestLoginHandler.auth;
handle['/auth'] = requestLoginHandler.auth;
handle['/registration'] = requestRegistrationHandler.registration;
handle['/createConnection'] = requestCreateConnection.createConnection;





server.start(router.route, handle)
socketServer.startSocketServer();