const { WebClient } = require('@slack/client');
var tools = require('./config.js');

const { IncomingWebhook } = require('@slack/client');
const url = tools.slack_webhook_url();
const webhook = new IncomingWebhook(url);



// Send simple text to the webhook channel
var message = function sendMessage(content){
	console.log('sending message')
	console.log(content)
	webhook.send(content, function(err, res) {
    if (err) {
        console.log('Error:', err);
    } else {
        console.log('Message sent: ', res);
    }
});
}

module.exports = message;
