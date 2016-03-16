'use strict';

app.controller('HomeCtrl', ['$scope','authService', function ($scope,authService) {
    $scope.authentication = authService.authentication;
			
}]);