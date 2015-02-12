 var app = angular.module('redditApp');


app.controller('PostsController', function ($scope, FirebaseService) {
 
	$scope.getPosts = function() {
		FirebaseService.getData().then(function(response) {
			$scope.posts = response; // <-- this is not getting my posts from Firebase or not get setting to view
			//console.log(response);
		});
	};

	$scope.addPost = function() {
		FirebaseService.addPost($scope.newPost).then(function(response){
			$scope.getPosts();
			//console.log(response);
			$scope.posts = response;
		});
	};

	$scope.vote = function(id, direction) {
		FirebaseService.vote(id, direction).then(function(response) {
			$scope.getPosts();
			//console.log(response);
		});
	};

	$scope.submitComment = function(id, commentForm) {
		FirebaseService.comment(id, commentForm).then(function(response) {
			$scope.getPosts();
			//console.log(response);
		});
	};



}); 