const qs = require('qs');
const http = require('http');
const fs = require('fs');

const sever = http.createServer((req, res) => {
    if(req.method === 'GET'){
        fs.readFile('./views/todo.html', (err, data) => {
            if(err){
                console.log(err);
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        })
    } else {
        let data = '';
        req.on('data', chunk => data += chunk);
        req.on('end', () => {
            const parsedData = qs.parse(data);
            fs.readFile('./views/display.html', 'utf-8', (err, dataResponse) =>{
                if(err){
                    console.log(err);
                } 
                dataResponse = dataResponse.replace('{morning}', parsedData.morning);
                dataResponse = dataResponse.replace('{noon}', parsedData.noon);
                dataResponse = dataResponse.replace('{afternoon}', parsedData.afternoon);
                dataResponse = dataResponse.replace('{evening}', parsedData.evening);
                res.writeHead(200, {'Content-Type' : 'text/html'});
                res.write(dataResponse);
                return res.end();
            })
        })
        req.on('error', () => console.log('error'));
    }
});

sever.listen(8080, 'localhost', () => console.log('Sever is running at localhost:8080'));