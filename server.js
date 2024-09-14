const http = require('http');
const fs = require('fs');
const path = require('path');

//Define the port and paths
const PORT = 3000;
const JSON_FILE_PATH =  path.join(__dirname, 'data.json');
const HTML_FILE_PATH = path.join(__dirname, 'public', 'index.html');
console.log(JSON_FILE_PATH);

//Create the HTTP server
const server = http.createServer((req,res) => {
    if(req.url == '/'){
        //serve the HTML file
        fs.readFile(HTML_FILE_PATH, 'utf8', (err,data) => {
            if(err){
                res.writeHead(500, { 'Content-Type': 'text/plain'});
                res.end('Error reading the hTML file.');
                return;
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });
    }else if(req.url === '/data'){
        //Serve the JSON data
        fs.readFile(JSON_FILE_PATH, 'utf8', (err, data) => {
            if(err){
                res.writeHead(500, { 'Content-Type': 'text/plain'});
                res.end('Error reading the JSON file.');
                return;
            }
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(data);
        });
    }else{
        //Handle 404 for any other routes
        res.writeHead(404, { 'Content-Type': 'text/plain'});
        res.end('Not Found');
    }
});

//start the server
server.listen(3000, () => {
    console.log("Server running on http://localhost:3000/");
});

