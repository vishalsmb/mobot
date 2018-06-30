const express = require('express');
const bot = require('./bot.js');
require('dotenv').config();

const app = express();


app.get('/',function(req ,res ){
	res.writeHead(200,{'Content-Type':'text/plain'});
	res.end("Welcome to my bot app .. visit skype for more");
})

app.post('/api/messages',bot.connector('*').listen());

app.listen(process.env.port || process.env.PORT || 3978, () => console.log('Listening on port '+ port));


