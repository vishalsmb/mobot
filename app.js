const express = require('express');
const bot = require('./bot.js');
require('dotenv').config();

const app = express();
const port =  process.env.port || process.env.PORT || 3978;

var string1 = `  <!doctype html> 
                <html>
                <head>
                    <title>Chatbot application</title>
                </head>
                <body>
                    <center>
                        <h2>Simple chatbot application</h2>
                    </center>
                </body>`;
app.get('/',function(req ,res ){
	res.writeHead(200,{'Content-Type':'text/html'});
	res.end(string1);
})

app.post('/api/messages',bot.connector('*').listen());

app.listen(port, () => console.log('Listening on port '+ port));


