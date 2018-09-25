const { WebClient } = require('@slack/client');


const { IncomingWebhook } = require('@slack/client');
const url = process.env.slack_webhook_url
const webhook = new IncomingWebhook(url);



// Send simple text to the webhook channel
var message = function sendMessage(content){
		// An access token (from your Slack app or custom integration - xoxa, xoxp, or xoxb)
const token = process.env.slack_oath;

const web = new WebClient(token);

// This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID
const conversationId = 'C0PM35ALC';

// See: https://api.slack.com/methods/chat.postMessage
web.chat.postMessage({ channel: conversationId, text: content.text, attachments: content.attachments })
  .then((res) => {
    // `res` contains information about the posted message
    console.log('Message sent: ', res.ts);
  })
  .catch(console.error);
	
}

var enhancedMessage = function sendenhancedMessage(){
	// An access token (from your Slack app or custom integration - xoxa, xoxp, or xoxb)
const token = process.env.slack_oath;

const web = new WebClient(token);

// This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID
const conversationId = 'C0PM35ALC';

// See: https://api.slack.com/methods/chat.postMessage
web.chat.postMessage({ channel: conversationId, text: 'Hello there' })
  .then((res) => {
    // `res` contains information about the posted message
    console.log('Message sent: ', res.ts);
  })
  .catch(console.error);
}

var editMessage = function editTheMessage(message){

}



module.exports = {message: message, enhancedMessage: enhancedMessage};


