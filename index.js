var request = require('request')
, Q = require('Q')
, requestQ = function(url) {
	var deferred = Q.defer();
	request(url, function(error,response,data) {
		if (error) {
            deferred.reject(new Error(error));
        } else {
            deferred.resolve(data);
        }
	});
	return deferred.promise;
};

module.exports = function(host, query, res) {
	, promises = []
	, parameters = []
	, dataObj = {};
	for(var parameter in query) {
       promises.push(requestQ(host+query[parameter]));
       parameters.push(parameter);    
	}

    Q.all(promises).then(function(results) {
    	for(var i=0;i<results.length;i++) {
    		dataObj[parameters[i]] = results[i];
    	}
    	res.json(dataObj);
    });
};
