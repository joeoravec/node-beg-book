var querystring = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable");

function start(response) {
    console.log("new Request handler 'start' was called.");

    var body = '<html>' +
        '<head>' +
        '<meta http-equiv ="Content-Type" content ="text/ html; '+
        'charset = UTF-8" />' +
        '</head>' +
        '<body>' +
        '<form action="/upload" enctype="multipart/form-data" method="post">' +
        '<input type="file" name="upload">' +
        '<input type="submit" value="upload file" />' +
        '</form>' +
        '</body>' +
        '</html>';

        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(body);
        response.end();
}

function upload(response, request) {
    console.log("Request handler 'upload' was called.");
    var form = new formidable.IncomingForm();
    form.parse(request, function (error, fields, files) {
        fs.rename(files.upload.path, "/AssetRoot/test.png", function (error) {
            if (error) {
                fs.unlink("/AssetRoot/test.png");
                fs.rename(files.upload.path, "/AssetRoot/test.png");
            }
        });
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("received: <br><img src='/show'>");
        response.end();
    });
}

function show(response) {
    console.log('request handler show was called.');
    response.writeHead(200, {"Content-Type": "image/png"});
    fs.createReadStream("/AssetRoot/test.png").pipe(response);
}

exports.start = start;
exports.upload = upload;
exports.show = show;