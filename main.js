const request = require('request');
const { WebClient } = require('@slack/client');
// Global variables
var tools = require('./config.js');
var hubkey = tools.hubkey();
var dealbot = require('./dealbot.js')

// Functions
function getAccount(){
	request('https://api.hubapi.com/integrations/v1/me?hapikey='+hubkey, { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
 // console.log(body);
  
});
}

function getDeals(){
	request('https://api.hubapi.com/deals/v1/deal/recent/created?hapikey='+hubkey+'&since='+getDateThreeDaysAgo(), { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  
	  body.results.forEach(function(value,index){
	  	console.log(index)
	  	
	  	setTimeout(function(){ deal(value);}, 2000*index)
	  
		});
  
  
	});
}

function deal(deal){
	

	request('https://api.hubapi.com/deals/v1/deal/'+deal.dealId+'?hapikey='+hubkey, { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  console.log(body)
  var hasOwner;
  if (typeof body.properties.hubspot_owner_id !== 'undefined'){
  	hasOwner = true;
  }else{
  	hasOwner = false;
  }
  var results = {
	    "text": "Whoa! There's a new lead in town.",
	    "attachments": [
	    	{
	    		"text": deal.properties.dealname.value
	    	},
	        {
	            "text": new Date(deal.properties.dealname.timestamp)
	        },

	        {
	            "text": hasOwner ? body.properties.hubspot_owner_id.value : "Unclaimed"
	        }
	    ]

		}
	  
	  
	  dealbot(results)
	  
  
  
	
	})
}

function getDateThreeDaysAgo(){
	var d = new Date(); // Today!
d.setDate(d.getDate() - 3); // Three days ago!
return d.getTime();
}


//Start app
//console.log('hej')
getAccount();
var deals = getDeals();
deals;
getDateThreeDaysAgo();
//dealbot(deals);
