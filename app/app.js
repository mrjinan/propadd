//'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('DemoApp', ['ngRoute', 'LocalStorageModule', 'angular-loading-bar']);

app.config(function ($routeProvider) {

    $routeProvider.when("/home", {
        controller: "HomeCtrl",
        templateUrl: "home/home.html"
    });

    $routeProvider.when("/login", {
        controller: "LoginCtrl",
        templateUrl: "auth/login.html"
    });

    $routeProvider.when("/signup", {
        controller: "SignupCtrl",
        templateUrl: "auth/signup.html"
    });

    $routeProvider.when("/dash", {
        controller: "DashCtrl",
        templateUrl: "dash/dash.html"
    });


    $routeProvider.otherwise({ redirectTo: "/home" });

});

var serviceBase = 'http://demoapi03032016.azurewebsites.net/';

app.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase,
    clientId: 'defaultWeb'
});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});

app.run(['authService', function (authService) {
    authService.fillAuthData();
}]);


