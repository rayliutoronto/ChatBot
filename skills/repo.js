module.exports = function(controller) {
	var rasa = require('botkit-rasa')({rasa_uri: 'http://localhost:5000'});
	controller.middleware.receive.use(rasa.receive);

	controller.hears(['greet','bye','query'],'direct_message', rasa.hears, function(bot, message) {

	    console.log('Intent:', message.intent);
	    console.log('Entities:', message.entities);    

	    bot.reply(message, 'hallo...')
	});

    // give the bot something to listen for.
    controller.hears('hello',['direct_message','direct_mention','mention'],function(bot,message) {

        bot.reply(message,'Hello yourself.');
    
    });
}