const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const main = require('./main.js');
const request = require('request');
const { WebClient } = require('@slack/client');
const app = express()
var bodyParser = require('body-parser');
const dealbot = require('./dealbot.js')

  app.use(express.static(path.join(__dirname, 'public')))
  app.set('views', path.join(__dirname, 'views'))
  app.set('view engine', 'ejs')
  app.get('/', (req, res) => res.render('pages/index'))
  app.use(bodyParser.urlencoded({ extended: true }));       // to support JSON-encoded bodies
  
  app.post('/action', function(req, res) {
    
  	//dealbot.enhancedMessage();
  	//var attachment_id = req.body.payload.attachment_id;
  	//var original_message = req.body.payload.original_message;
  	var json = req.body.payload.JSON()
  	var attachment_id = json.attachment_id;
  	var original_message = json.original_message;
  	console.log(original_message);
  	original_message.attachments[attachment_id].actions = [];
  	original_message.attachments[attachment_id].text = original_message.attachments[attachment_id].text + "\nViktor claimed this lead!";
  	console.log(attachment_id);
  	console.log(req.body);
  	
    res.send(original_message);
}); 


  app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
  
