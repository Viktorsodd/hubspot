const request = require('request');
const { WebClient } = require('@slack/client');
// Global variables
const tools = require('config');
const dealbot = require('dealbot')
var hubkey = tools.hubkey();



// Functions
function getAccount(){
	request('https://api.hubapi.com/integrations/v1/me?hapikey='+hubkey, { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
 // console.log(body);
  
});
}

//Original slack message structure
var slackMessage = {
	"text": "Here are the new leads from the past 24 hours.",
	    "attachments": [
	    	
	    ]
}

function getDeals(){
	request('https://api.hubapi.com/deals/v1/deal/recent/created?hapikey='+hubkey+'&since='+getDateThreeDaysAgo(), { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  var arrayLength = body.results.length;
  
	  body.results.forEach(function(value,index){
	  	console.log(index)
	  	console.log(body.results.length)
	  	
	  	//Get the details of each deal, limit the fetch rate
	  	setTimeout(function(){ deal(value,index,arrayLength);}, 2000*index)

	  	
	  	
	  
		});
	  
  
  
	});
}

function deal(deal,index,arrayLength){
	

	request('https://api.hubapi.com/deals/v1/deal/'+deal.dealId+'?hapikey='+hubkey, { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  console.log(body)

  //Check if the deal has an owner
  var hasOwner;
  if (typeof body.properties.hubspot_owner_id !== 'undefined'){
  	hasOwner = true;
  }else{
  	hasOwner = false;
  }

  //Check if the deal has a value
  var hasAmount;
  if (typeof body.properties.amount !== 'undefined'){
  	hasAmount = true;
  	console.log("hasAmount = true")
  }else{
  	console.log("hasAmount = false")
  	hasAmount = false;
  }

  //Check if it's the right pipeline
  var kamPipe;
  if(body.properties.pipeline.value == '722b58ad-73b9-4656-bc3c-408b13db8cee'){
  	kamPipe = true;
  }else{
  	console.log('Wrong pipe')
  	return
  }

//New variables to add; city (Stockholm), workspace_min (1), movie_in_date (1537056000000), workspaces (2), movie_in_date_latest (1544832000000), user_dashboard_url

  
  console.log('Right pipe!')
  var snippet = {
  				"title": deal.properties.dealname.value,
  				"title_link": "https://app.hubspot.com/contacts/3285375/deal/" + deal.dealId,
	    		"text": "Budget: *" + (hasAmount ? body.properties.amount.value + "*" : "-*") + "\n"
	    	
	    		        
	            + "Created: *" + new Date(deal.properties.dealname.timestamp) + "*\n"
	        

	        
	            + "Deal owner: *" + (hasOwner ? body.properties.hubspot_owner_id.sourceId + "*" : "Unclaimed*"),
	            "actions": (hasOwner ? {} : [
			        {
			          "type": "button",
			          "text": "Claim that lead!",
			          "url": "https://app.hubspot.com/contacts/3285375/deal/" + deal.dealId
			        }
			      ])
	        };
	    	
	    
	  //console.log(slackMessage)
	  createMessage(snippet)
	  if(index === arrayLength - 1){
	  	dealbot.message(slackMessage)
	  }
	  
	  
  
  
	
	})
}

function createMessage(snippet){
	slackMessage.attachments.push(snippet);
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
dealbot.enhancedMessage()
//dealbot(deals);
