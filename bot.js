"use strict";
const builder = require('botbuilder');
var jsonString;
var request = require('sync-request');
function myfunc(name) {
    var query = "https://www.googleapis.com/customsearch/v1/?key=AIzaSyCVhFTpinpeDorPeftXQF0uDwtyGYBdbE8&cx=015474952861500609087:1cnrbvoeiza&q=";
    var url = query+name;
    var a =request('GET',url);
    jsonString = JSON.parse(a.getBody());
}
var inMemoryStorage = new builder.MemoryBotStorage();
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
const bot = new builder.UniversalBot(connector,[
	function(session) {
		session.send("Welcome .. I am a bot");
		session.send("In a nutshell, I'm capable of delivering curated movie details and reviews")
		builder.Prompts.choice(session,"In short,here is what I can do","Movie Search|Movie Review", {listStyle:3});
	},
	function(session,results) {
		session.dialogData.choice = results.response.entity ;
		console.log(session.dialogData.choice);
		session.beginDialog(session.dialogData.choice);
	},
]).set('storage',inMemoryStorage)
.endConversationAction(
	"endTalk","Gud Bye",
	{
		matches: /^bye$/i,
		confirmPrompt: " this will clear .. continue ??"
	}
);
bot.dialog('Movie Search',[
	function(session){
		builder.Prompts.text(session,"Enter the movie name  ..  ");
	},
	function(session,results){
		var movieName = results.response;
		session.send("Loading the results ..");
		myfunc(movieName);
		var cards = getCardsAttachments();
		var reply = new builder.Message(session)
       		.attachmentLayout(builder.AttachmentLayout.carousel)
       		.attachments(cards);
    	session.send(reply);
    }
])
bot.dialog('Movie Review',[
	function(session){
		builder.Prompts.text(session,"Enter the movie name  ..  ");
	},
	function(session,results){
		var movieName = results.response;
		session.send("Loading the results ..");
		myfunc(movieName);
		var cards = getCardsAttachments1();
		var reply = new builder.Message(session)
       		.attachmentLayout(builder.AttachmentLayout.carousel)
       		.attachments(cards);
    	session.send(reply);
    	session.send('Rating (out of 10): '+jsonString.items[0].pagemap.aggregaterating[0].ratingvalue);
    	session.send('Rating count : '+jsonString.items[0].pagemap.aggregaterating[0].ratingcount);
    	session.send('Review count : '+jsonString.items[0].pagemap.aggregaterating[0].reviewcount);
    	session.send()
    }
])
function getCardsAttachments(session) {
   return [
        new builder.HeroCard(session)
            .title(jsonString.items[0].title)
            .subtitle(jsonString.items[0].displayLink)
            .text(jsonString.items[0].snippet)
            .images([
                builder.CardImage.create(session, jsonString.items[0].pagemap.cse_thumbnail[0].src)
            ])
            .buttons([
                builder.CardAction.openUrl(session, jsonString.items[0].title, 'Learn More')
            ]),

        new builder.HeroCard(session)
            .title(jsonString.items[1].title)
            .subtitle(jsonString.items[1].displayLink)
            .text(jsonString.items[1].snippet)
            .images([
                builder.CardImage.create(session, jsonString.items[1].pagemap.cse_thumbnail[0].src)
            ])
            .buttons([
                builder.CardAction.openUrl(session, jsonString.items[1].title, 'Learn More')
            ]),

        new builder.HeroCard(session)
            .title(jsonString.items[2].title)
            .subtitle(jsonString.items[2].displayLink)
            .text(jsonString.items[2].snippet)
            .images([
                builder.CardImage.create(session, jsonString.items[2].pagemap.cse_thumbnail[0].src)
            ])
            .buttons([
                builder.CardAction.openUrl(session, jsonString.items[2].title, 'Learn More')
            ]),

        new builder.HeroCard(session)
            .title(jsonString.items[3].title)
            .subtitle(jsonString.items[3].displayLink)
            .text(jsonString.items[3].snippet)
            .images([
                builder.CardImage.create(session, jsonString.items[3].pagemap.cse_thumbnail[0].src)
            ])
            .buttons([
                builder.CardAction.openUrl(session, jsonString.items[3].title, 'Learn More')
            ]),
    ];
}
function getCardsAttachments1(session) {
   return [
        new builder.HeroCard(session)
            .title(jsonString.items[0].title)
            .subtitle(jsonString.items[0].displayLink)
            .text(jsonString.items[0].snippet)
            .images([
                builder.CardImage.create(session, jsonString.items[0].pagemap.cse_thumbnail[0].src)
            ])
            .buttons([
                builder.CardAction.openUrl(session, jsonString.items[0].title, 'Learn More')
            ]),
    ];
}
module.exports = bot;