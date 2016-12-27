var xmlParser = require('xml2js').parseString;
var request = require('request');
var urlencode = require('urlencode');
var zwsid = 'X1-ZWz19g98gn4zrf_3e7gq';
var api_key = 'AIzaSyAaOzU7c_8RDreOb24Cugn1D9_gaWt0_To';

module.exports.getEstimate = function(add, cityState){
   var address = urlencode(add);
   var cityStateZip = urlencode(cityState); 
   request('http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz19g98gn4zrf_3e7gq&address=' + address + '&citystatezip=' + cityStateZip, function (error, response, body) {
   if(response == undefined){
        console.log(response);
        return 500;
   }

   if (!error && response.statusCode == 200) {
   		xmlParser(body, function(err,result){ 
	      	statusCode = result['SearchResults:searchresults']['message'][0]['code'][0];
	   		if(statusCode == 0){
	        resultsAddress = result['SearchResults:searchresults']['response'][0]['results'][0]['result'][0]['address'][0];
	        resultsZestimate = result['SearchResults:searchresults']['response'][0]['results'][0]['result'][0]['zestimate'][0];
	    	estimate = {
	        	"lat": resultsAddress['latitude'][0],
	        	"lng": resultsAddress['longitude'][0],
	        	"low": resultsZestimate['valuationRange'][0]['low'][0]['_'],
	        	"mid": resultsZestimate['amount'][0]['_'],
	       		"high": resultsZestimate['valuationRange'][0]['high'][0]['_']
	      	};
	      	console.log(estimate);
	      	return estimate;
	    	}
	    	else{
	    	console.log(statusCode);
	      	return statusCode;
	    	}  
		});
   }
  else{
   return response.statusCode;
  }
}); 
}