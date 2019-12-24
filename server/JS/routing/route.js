function route(pathName, handle, response, data) {
    if (typeof handle[pathName] === 'function') {
        handle[pathName](response, data);
    } else {
        console.log("No request handler found for " + pathName);
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 not found");
        response.end();
    }
}

exports.route = route;