var http = require("http"),
    url  = require("url");

function start(route, handle) {
    var onRequest = function (request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log("request received for " + pathname);
        route(handle, pathname, response, request);
    };

    http.createServer(onRequest).listen(8888);

    console.log("Server has started");
}

exports.start = start;