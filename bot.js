"use strict";
const builder = require('botbuilder');
var jsonString, jsonStringNews;
var request = require('sync-request');
function myfunc(name) {
    var query = "https://www.googleapis.com/customsearch/v1/?key=AIzaSyBv-J3zGTK00_0C30R10U9Mv9cZRRhPSIQ&cx=015474952861500609087:1cnrbvoeiza&q=";
    var url = query+name;
    var a =request('GET',url);
    jsonString = JSON.parse(a.getBody());
}
function myfuncNews() {
    var url = "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=R0iAqmbTHnHuYhKuMAJAL4Qxg413RdlT";
    var a =request('GET',url);
    jsonStringNews = JSON.parse(a.getBody());
}
var inMemoryStorage = new builder.MemoryBotStorage();
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
const bot = new builder.UniversalBot(connector,[
	function(session) {
		session.send("Welcome to the bot service");
		builder.Prompts.choice(session,"In short,here is what I can do","Movie Search|Movie Review|Top News", {listStyle:3});
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
bot.dialog('Top News',[
	function(session){
		myfuncNews();
		var cardsNews = getCardsAttachmentsNews();
		var replyNews = new builder.Message(session)
       		.attachmentLayout(builder.AttachmentLayout.carousel)
       		.attachments(cardsNews);
    	session.send(replyNews);
    	session.send("reply bye to quit")
    }
])
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
            .subtitle(jsonString.items[0].link)
            .text(jsonString.items[0].snippet)
            .images([
                builder.CardImage.create(session, jsonString.items[0].pagemap.cse_thumbnail[0].src)
            ])
            .buttons([
                builder.CardAction.openUrl(session, jsonString.items[0].title, 'Learn More')
            ]),

        new builder.HeroCard(session)
            .title(jsonString.items[1].title)
            .subtitle(jsonString.items[1].link)
            .text(jsonString.items[1].snippet)
            .images([
                builder.CardImage.create(session, jsonString.items[1].pagemap.cse_thumbnail[0].src)
            ])
            .buttons([
                builder.CardAction.openUrl(session, jsonString.items[1].title, 'Learn More')
            ]),

        new builder.HeroCard(session)
            .title(jsonString.items[2].title)
            .subtitle(jsonString.items[2].link)
            .text(jsonString.items[2].snippet)
            .images([
                builder.CardImage.create(session, jsonString.items[2].pagemap.cse_thumbnail[0].src)
            ])
            .buttons([
                builder.CardAction.openUrl(session, jsonString.items[2].title, 'Learn More')
            ]),

        new builder.HeroCard(session)
            .title(jsonString.items[3].title)
            .subtitle(jsonString.items[3].link)
            .text(jsonString.items[3].snippet)
            .images([
                builder.CardImage.create(session, jsonString.items[3].pagemap.cse_thumbnail[0].src)
            ])
            .buttons([
                builder.CardAction.openUrl(session, jsonString.items[3].title, 'Learn More')
            ]),
    ];
}
function getCardsAttachmentsNews(session) {

	return [
        new builder.HeroCard(session)
            .title(jsonStringNews.results[0].title)
            .subtitle(jsonStringNews.results[0].url)
            .text(jsonStringNews.results[0].abstract)
            .images([
                builder.CardImage.create(session, jsonStringNews.results[0].multimedia[0].url)
            ]),
            
        new builder.HeroCard(session)
            .title(jsonStringNews.results[1].title)
            .subtitle(jsonStringNews.results[1].url)
            .text(jsonStringNews.results[1].abstract)
            .images([
                builder.CardImage.create(session, jsonStringNews.results[1].multimedia[0].url)
            ]),
            
        new builder.HeroCard(session)
            .title(jsonStringNews.results[2].title)
            .subtitle(jsonStringNews.results[2].url)
            .text(jsonStringNews.results[2].abstract)
            .images([
                builder.CardImage.create(session, jsonStringNews.results[2].multimedia[0].url)
            ]),

        new builder.HeroCard(session)
            .title(jsonStringNews.results[3].title)
            .subtitle(jsonStringNews.results[3].url)
            .text(jsonStringNews.results[3].abstract)
            .images([
                builder.CardImage.create(session, jsonStringNews.results[3].multimedia[0].url)
            ]),
              new builder.HeroCard(session)
            .title(jsonStringNews.results[4].title)
            .subtitle(jsonStringNews.results[4].url)
            .text(jsonStringNews.results[4].abstract)
            .images([
                builder.CardImage.create(session, jsonStringNews.results[4].multimedia[0].url)
            ]),
            
        new builder.HeroCard(session)
            .title(jsonStringNews.results[5].title)
            .subtitle(jsonStringNews.results[5].url)
            .text(jsonStringNews.results[5].abstract)
            .images([
                builder.CardImage.create(session, jsonStringNews.results[5].multimedia[0].url)
            ]),
            
        new builder.HeroCard(session)
            .title(jsonStringNews.results[6].title)
            .subtitle(jsonStringNews.results[6].url)
            .text(jsonStringNews.results[6].abstract)
            .images([
                builder.CardImage.create(session, jsonStringNews.results[6].multimedia[0].url)
            ]),

        new builder.HeroCard(session)
            .title(jsonStringNews.results[7].title)
            .subtitle(jsonStringNews.results[7].url)
            .text(jsonStringNews.results[7].abstract)
            .images([
                builder.CardImage.create(session, jsonStringNews.results[7].multimedia[0].url)
            ]),
            new builder.HeroCard(session)
            .title(jsonStringNews.results[8].title)
            .subtitle(jsonStringNews.results[8].url)
            .text(jsonStringNews.results[8].abstract)
            .images([
                builder.CardImage.create(session, jsonStringNews.results[8].multimedia[0].url)
            ]),

        new builder.HeroCard(session)
            .title(jsonStringNews.results[9].title)
            .subtitle(jsonStringNews.results[9].url)
            .text(jsonStringNews.results[9].abstract)
            .images([
                builder.CardImage.create(session, jsonStringNews.results[9].multimedia[0].url)
            ]),
    ];
}
function getCardsAttachments1(session) {
   return [
        new builder.HeroCard(session)
            .title(jsonString.items[0].title)
            .subtitle(jsonString.items[0].link)
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