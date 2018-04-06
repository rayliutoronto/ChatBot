module.exports = function(controller) {
	var rasa = require('botkit-rasa')({rasa_uri: 'http://localhost:5000', rasa_project: 'default'});
	controller.middleware.receive.use(rasa.receive);

	controller.hears(['greet','bye','query'], ['direct_message','direct_mention','mention'], rasa.hears, function(bot, message) {

	    console.log('Intent:', message.intent);
	    console.log('Entities:', message.entities);    

		if(message.intent.confidence < 0.8){
			bot.reply(message, "Sorry, I didn't get you.");
		
       		bot.createConversation(message, startConv);
		}else{
			bot.reply(message, 'hallo...')
		}

	});

	startConv = function(message, conv) {
		convo.ask("Are you planning to query dataset?", function(message, convo) {
			console.log(JSON.stringify(message))
			console.log(JSON.stringify(convo))
			// rasa.receive()
			// askSize(response, convo);
			convo.next();
		  });
	}
}
