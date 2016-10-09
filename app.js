var restify = require('restify');
var builder = require('botbuilder');
//var env = require('./env.js');

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat bot
var connector = new builder.ChatConnector({
    appId: "a5851896-1be9-4cc8-ba57-3d82846ebbc9",
    appPassword: "jt35SebaHqMBpSuMHnkLf0d"
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());


var hokeyPokey = ["Put your left foot in", "Your left foot out",
"Your left foot in",
"And shake it all about",
"You do the hokey pokey",
"And turn yourself around",
"That's what it's all about",
"Now put your right foot in",
"Your right foot out",
"Right foot in",
"Then you shake it all about",
"And then you do the hokey pokey",
"Turn yourself around",
"That's what it's all about"];

var line = 0;



// Create LUIS recognizer that points at our model and add it as the root '/' dialog for our Cortana Bot.
var model = 'https://api.projectoxford.ai/luis/v1/application?id=734ac012-e96d-4ccd-ae76-87575718229e&subscription-key=5a08e0a9cbd04b1db1ff7f5c07f2554d'// + process.env.LUIS_KEY;
var recognizer = new builder.LuisRecognizer(model);
var dialog = new builder.IntentDialog({ recognizers: [recognizer] });
bot.dialog('/', dialog);

//=========================================================
// Bots Dialogs
//=========================================================

dialog.matches('Greeting',[
	function(session, args, next){
		builder.Prompts.text(session, "Hello!  I am Botyonce and I will teach you how to dance! Would you like to learn how to dance to the hokey pokey?");
	},
	function(session, results, next){
		if((results.response == "yes") || (results.response == "Yes")){
			session.beginDialog('/selectDance');
		}
		else{
			session.endConversation("You are super lame nerd. Bye.");
		}
	}
]);

bot.dialog('/selectDance', [
	function(session){
		builder.Prompts.text(session, "Tell me when you are ready!");
		session.endDialog();
	}
]);

dialog.matches('startDance',[
	function(session){
		session.send("Let's begin!");
		session.beginDialog('/nextMove');
	}
]);

bot.dialog('/nextMove', [
	function(session){
		session.send(hokeyPokey[line]);
		line = line + 1;
		session.endDialog();
	}
]);

dialog.matches('repeatMove', [
	function(session){
		line = line - 1;
		session.beginDialog('/nextMove');
	}
]);

dialog.matches('nextMove',[
	function(session){
		if(line < hokeyPokey.length){
			session.send(hokeyPokey[line]);
			line = line + 1;
		}
		else{
			session.endConversation("That's the end of the dance! Hope to see you soon!");
		}
		
	}
]);

dialog.matches('None',[
	function(session){
		session.send("I didn't understand that, please try again");
	}
]);





//"Hello!  I am Botyonce and I will teach you how to dance! 
//Would you like to learn how to dance to single ladies?" 

//"Tell me when you are ready!"

//"Dance moves go here"


/*Everybody form a circle
Put your left foot in
Your left foot out
Your left foot in
And shake it all about
You do the hokey pokey
And turn yourself around
Now put your right foot in
Your right foot out
Right foot in
Then you shake it all about
And then you do the hokey pokey
Turn yourself around
That's what it's all about
You put your head in
You put your head out
Put your head in
And bang it all about
Do the hokey pokey
And turn yourself around
That's what it's all about
Let's do the hokey pokey!
Let's do the hokey pokey!
Let's do the hokey pokey!
That's what it's all about
Put your right hand in
Your right hand out
Your right hand in
And shake it all about
You do the hokey pokey
And you turn yourself around
Now put your tongue in
And your tongue out
Tongue in
And blblblblbl!
You do the hokey pokey
Turn yourself around
That's what it's all about
You put your bottom in
Put your bottom out
Put your bottom in
You put your bottom out
Put your bottom in
You put your bottom out
Put your bottom in
You put your bottom out
Put your bottom in
You put your bottom out
Put your bottom in
You put your bottom out
Put your bottom in
You put your bottom out
Do the hokey pokey
Turn yourself about
Let's do the hokey pokey
Let's do the hokey pokey
Let's do the hokey pokey
That's what it's all about*/

//"Are you sure you want to quit?"

//"What's your name again?"

//"You're useless %(name)s"
//exits

//for no 
//repeat move
