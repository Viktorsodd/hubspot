const request = require('request');

// Global variables
var tools = require('./config.js');
var hubkey = tools.hubkey();
var dealbot = require('./dealbot.js')

// Functions
function getAccount(){
	request('https://api.hubapi.com/integrations/v1/me?hapikey='+hubkey, { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  console.log(body);
  
});
}

function getDeals(){
	request('https://api.hubapi.com/deals/v1/deal/recent/created?hapikey='+hubkey, { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  console.log(body);
  
});
}


//Start app
getAccount();
getDeals();
dealbot.post();
