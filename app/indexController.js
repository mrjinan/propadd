'use strict';
app.controller('indexController', ['$scope', '$location', 'authService', 'clientService', 'contractService', function ($scope, $location, authService, clientService, contractService) {

    $scope.logOut = function () {
        authService.logOut();
        $location.path('/home');
    }

    $scope.authentication = authService.authentication;

    
    //clientService.getClientDetails().then(function (results) {

    //    $scope.client = results.data;

    //}, function (error) {
    //    //alert(error.data.message);
    //});

    

}]);