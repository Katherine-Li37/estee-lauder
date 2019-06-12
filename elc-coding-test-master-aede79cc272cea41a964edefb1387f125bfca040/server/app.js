/**
 * The Server Can be configured and created here...
 * 
 * You can find the JSON Data file here in the Data module. Feel free to impliment a framework if needed.
 */

/*
-- This is the product data, you can view it in the file itself for more details 
{
    "_id": "019",
    "isActive": "false",
    "price": "23.00",
    "picture": "/img/products/N16501_430.png",
    "name": "Damage Reverse Thickening Conditioner",
    "about": "Dolor voluptate velit consequat duis. Aute ad officia fugiat esse anim exercitation voluptate excepteur pariatur sit culpa duis qui esse. Labore amet ad eu veniam nostrud minim labore aliquip est sint voluptate nostrud reprehenderit. Ipsum nostrud culpa consequat reprehenderit.",
    "tags": [
        "ojon",
        "conditioner"
    ]
}
*/
const data      = require('./data');
const http      = require('http');
const hostname  = 'localhost';
const port      = 3035;

var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

/** 
 * Start the Node Server Here...
 * 
 * The http.createServer() method creates a new server that listens at the specified port.  
 * The requestListener function (function (req, res)) is executed each time the server gets a request. 
 * The Request object 'req' represents the request to the server.
 * The ServerResponse object 'res' represents the writable stream back to the client.
 */


app.post('/', function(req, res, next){
        // .. Here you can create your data response in a JSON format
        var searchResult=[];
        res.writeHead(200, {'Content-Type': 'text/plain'}); 
        data.forEach((product)=>{
            if(product.name.includes(Object.keys(req.body)[0])){
                searchResult.push(product);
            }
        });
        console.log(searchResult);

        res.write(JSON.stringify(searchResult)); // Write out the default response
        res.end(); //end the response
});

app.get('/', function(req, res, next){
    res.writeHead(200, {'Content-Type': 'text/plain'}); 
    res.write("Response goes in here..."); // Write out the default response
    res.end(); //end the response
});
// http.createServer(function (req, res) {
//     // .. Here you can create your data response in a JSON format
//     res.writeHead(200, {'Content-Type': 'text/plain'}); 
//     res.write("Response goes in here..."); // Write out the default response
//     res.end(); //end the response
// }).listen( port );

app.listen(port);

console.log(`[Server running on ${hostname}:${port}]`);
