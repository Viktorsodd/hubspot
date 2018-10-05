const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const main = require('./main.js');
const request = require('request');
const { WebClient } = require('@slack/client');
const app = express()
var bodyParser = require('body-parser');
const dealbot = require('./dealbot.js')
const cron = require("node-cron");


  app.use(express.static(path.join(__dirname, 'public')))
  app.set('views', path.join(__dirname, 'views'))
  app.set('view engine', 'ejs')
  app.get('/', (req, res) => res.render('pages/index'))
  app.use(bodyParser.urlencoded({ extended: true }));       // to support JSON-encoded bodies
  
  app.post('/action', function(req, res) {
    
  	//dealbot.enhancedMessage();
  	//var attachment_id = req.body.payload.attachment_id;
  	//var original_message = req.body.payload.original_message;
  	var json = JSON.parse(req.body.payload)
  	var attachment_id = json.attachment_id;
  	var original_message = json.original_message;
  	var user_name = json.user.name;
  	console.log(json);

  	if(json.actions.value == "lead_claim"){
  		original_message.attachments[attachment_id-1].text = original_message.attachments[attachment_id - 1].text + "\n*" + user_name + " claimed this lead!*";
  	}else{
  		original_message.attachments[attachment_id-1].text = original_message.attachments[attachment_id - 1].text + "\n*" + user_name + " deprioritized this lead!*";
  	}

  	original_message.attachments[attachment_id-1].actions = [];
  	
  	original_message.attachments[attachment_id-1].color = "#36a64f"
  	console.log(attachment_id);
  	console.log(req.body);
  	
    res.send(original_message);
}); 
  app.get('/getLeads', function(req, res) {
    main.deals(7);
    res.send("Success!")
  	
});


  app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
  console.log('Starting server')
  cron.schedule("55 14 * * *", function(){
  	main.deals(1);
  	console.log('Getting deals!')
  }, {scheduled: true, timezone: "Europe/Stockholm"});
  
