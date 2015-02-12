 var app = angular.module('redditApp');


app.controller('PostsController', function ($scope, FirebaseService) {
 
	$scope.getPosts = function() {
		FirebaseService.getData().then(function(response) {
			$scope.posts = response;
			//console.log(response);
		});
	};

	$scope.addPost = function() {
		FirebaseService.addPost($scope.newPost).then(function(response){
			$scope.getPosts();
			//console.log(response);
			$scope.posts = response.data;
		});
	};

	//Create a $scope.vote function that takes the post.id and the direction and passes it into a function called firebaseService.vote()

	$scope.vote = function(id, direction) {
		FirebaseService.vote().then(function(response) {
			$scope.getPosts();
			//console.log(response);
		});
	};

	$scope.submitComment = function(id, commentForm) {
		FirebaseService.comment().then(function(response) {
			$scope.getPosts();
			//console.log(response);
		});
	};



});