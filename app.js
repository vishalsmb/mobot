const express = require('express');
const bot = require('./bot.js');
require('dotenv').config();

const app = express();
const port =  3000;

app.get('/',function(req ,res ){
	res.writeHead(200,{'Content-Type':'text/plain'});
	res.end("Welcome to my bot app .. visit messenger for more");
})

app.post('/api/messages',bot.connector('*').listen());

app.listen(port, () => console.log('Listening on port '+ port));


