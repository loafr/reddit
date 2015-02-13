 var app = angular.module('redditApp');


app.controller('PostsController', function ($scope, FirebaseService) {
 
	$scope.getPosts = function() {
		FirebaseService.getData().then(function(response) {
			$scope.posts = response; 
		});
	};

	$scope.addPost = function() {
		$scope.newPost.id = guid();
   	 	$scope.newPost.timestamp = Date.now();
    	$scope.newPost.karma = 0;
    	$scope.newPost.comments = [];
		FirebaseService.addPost($scope.newPost).then(function(response){
			$scope.getPosts();
			$scope.posts = response;
			// $scope.newPost.title = ''; <-- can't seem to clear the form fields
			// $scope.newPost.body = '';
			// $scope.newPost.author = '';
		});
	};



	$scope.vote = function(id, direction) {
		FirebaseService.vote(id, direction, $scope.posts[id].karma).then(function(response) {
			$scope.getPosts();
		});
	};

	$scope.submitComment = function(id, commentForm) {
		FirebaseService.comment(id, commentForm).then(function(response) {
			$scope.newPost.comments[id].push(response);
			$scope.getPosts();
			$scope.newPost.commentForm = '';
		});
	};

	var guid = function() {
    var s4 = function() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
    };

    $scope.getPosts();

}); 
