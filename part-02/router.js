function route(handle, pathname, response, request) {
    console.log("Routing request for " + pathname);
    if (typeof handle[pathname] === 'function') {
        console.log('route');
        handle[pathname](response, request);
    } else {
        console.log("No request handler found for " + pathname);
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 not found");
        response.end();
    }
}

exports.route = route;