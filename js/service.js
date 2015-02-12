var app = angular.module('redditApp');



 app.service('FirebaseService', function ($http, $q) {
 	
 	this.getData = function() { //something isn't working here
 		var deferred = $q.defer();
 		$http(
 		  {
 			method: 'GET',
 			url: 'https://devmtn.firebaseio.com/posts.json'
 		  }
 		).then(function(response) {
 			//console.log(response);
 			deferred.resolve(response);
 		})
 		return deferred.promise;
 	};

 	this.addPost = function(post) {
 		var deferred = $q.defer();
 		post.timestamp = Date.now();
    	post.comments = [];
   		post.karma = 0;
   		post.id = guid();
   		$http({
   			method: 'PUT',
   			url: 'https://devmtn.firebaseio.com/posts/' + post.id + '.json',
   			data: post
   		}).then(function(response){
   			deferred.resolve;
   		})
   		return deferred.promise;
 	}

 	this.vote = function(id, direction) { //placeholder code
 		var deferred = $q.defer();
 		if(direction === 'up') {
	      karma++;
	    } else if(direction === 'down'){
	      karma--;
	    };
	    $http(
	    {
	    	method: 'PATCH',
	    	url: 'https://devmtn.firebaseio.com/posts/' + id + '.json',
	    }
	    ).then(function(response) {
	    	deferred.resolve(response);
	    })
	    return deferred.promise;
 	}

 	this.comment = function(id, direction) { //placeholder code
 		var deferred = $q.defer();
	    $http(
	    {
	    	method: 'PATCH',
	    	url: 'https://devmtn.firebaseio.com/posts/' + id + '.json',
	    }
	    ).then(function(response) {
	    	deferred.resolve(response);
	    })
	    return deferred.promise;
 	}

 	var guid = function() {
    var s4 = function() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
    };



 });