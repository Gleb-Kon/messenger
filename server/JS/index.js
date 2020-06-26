const server = require("./server/server")
const router = require("./routing/route");
const socketServer = require("./server/socketServer")

const requestLoginHandler = require("./requestHandlers/requestLoginHandler/requestLoginHandler")
const requestRegistrationHandler = require("./requestHandlers/requestRegistrationHandler/requestRegistrationHandler")
const requestGetDataUserHandler = require("./requestHandlers/reqestGetDataUserHandler/getDataUser")
const requestLogoutHandler = require("./requestHandlers/requestLogoutHandler/requestLogoutHandler")
const requestGetAllUsers = require("./requestHandlers/requestGetAllUsersHandler/getAllUsers")

handle = {}
console.log(typeof requestGetDataUserHandler.getDataUser)

handle['/registration'] = requestRegistrationHandler.registration;
handle['/auth'] = requestLoginHandler.auth;
handle['/logout'] = requestLogoutHandler.logout;
handle['/getDataUser'] = requestGetDataUserHandler.getDataUser;
handle['/getAllUsers'] = requestGetAllUsers.getAllUsers;



server.start(router.route, handle)
socketServer.startSocketServer();