const request = require('request');

module.exports = {
	post: function(){
		request.post('https://hooks.slack.com/services/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', {
    "text": "I am a test message http://slack.com",
    "attachments": [
        {
            "text": "And here’s an attachment!"
        }
    ]
})
	}

}