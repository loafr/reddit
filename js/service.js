var app = angular.module('redditApp');



 app.service('FirebaseService', function ($http, $q) {
 	
 	this.getData = function() { 
 		var deferred = $q.defer();
 		$http(
 		  {
 			method: 'GET',
 			url: 'https://devmtn.firebaseio.com/posts.json'
 		  }
 		).then(function(response) {
 			//debugger;
 			//console.log(response);
 			deferred.resolve(response.data);
 		})
 		return deferred.promise;
 	};

 	this.addPost = function(post) {
 		var deferred = $q.defer();
 	//      post.timestamp = Date.now();
    //  	post.comments = [];
    // 		post.karma = 0;
    // 		post.id = guid();
   		$http({
   			method: 'PUT',
   			url: 'https://devmtn.firebaseio.com/posts/' + post.id + '.json',
   			data: post
   		}).then(function(response){
   			deferred.resolve(response);
   		})
   		return deferred.promise;
 	}

 	this.vote = function(id, direction, karma) { 
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
	    	data: {karma: karma}
	    }
	    ).then(function(response) {
	    	deferred.resolve(response);
	    })
	    return deferred.promise;
 	}

 	this.comment = function(id, commentText) { 
 		//var deferred = $q.defer();
 		//debugger;
	    return $http(
	    {
	    	method: 'PATCH',
	    	url: 'https://devmtn.firebaseio.com/posts/' + id + '.json',
	    	data: {comment: commentText}
	    }
	    )};
	    //.then(function(response) {
	    	//debugger;
	    	//deferred.resolve(response.data);
	    //})
	    //return deferred.promise;
 	

 	
 });