'use strict';
app.controller('SignupCtrl', ['$scope', '$location', 'authService', 'ngAuthSettings', function ($scope, $location, authService, ngAuthSettings) {

    $scope.loginData = {
        userName: "",
        password: "",
        confirmPassword: "",
        useRefreshTokens: false
    };

    $scope.message = "";

    $scope.login = function () {

        authService.saveRegistration($scope.loginData).then(function (response) {

            authService.authentication.isAuth = true;
            authService.authentication.userName = response.config.data.userName;
            

            authService.login($scope.loginData).then(function (response) {

                $location.path('/dash');

            },
         function (err) {
             $scope.message = err.error_description;
         });

        },
         function (err) {
             var errorsString = "";

             var modelState = err.data.modelState;
             for (var key in modelState) {
                 if (modelState.hasOwnProperty(key)) {
                     for (var i = 0; i < modelState[key].length; i++) {
                         errorsString = (errorsString == "" ? "" : errorsString + "<br/>") + modelState[key][i];
                        // errors.push(modelState[key][i]);
                     }
                 }
             }

             $scope.message = errorsString;
         });
    };


    $scope.authExternalProvider = function (provider) {

        var redirectUri = location.protocol + '//' + location.host + '/app/auth/authcomplete.html';
        
        var externalProviderUrl = ngAuthSettings.apiServiceBaseUri + "api/Account/ExternalWebLogin?provider=" + provider
                                                                    + "&register=true&response_type=token&client_id=" + ngAuthSettings.clientId
                                                                    + "&redirect_uri=" + redirectUri;
        window.$windowScope = $scope;

        //    window.name = 'mainwin'


        window.onmessage = function (e) {
            $windowScope.authCompletedCB(e.data);

        }

        var oauthWindow = window.open(externalProviderUrl, "Authenticate Account", "location=0,status=0,width=600,height=750");
    };

    $scope.authCompletedCB = function (fragment) {

        $scope.$apply(function () {

            if (fragment.haslocalaccount == 'False') {

                authService.logOut();

                authService.externalAuthData = {
                    provider: fragment.provider,
                    userName: fragment.external_user_name,
                    externalAccessToken: fragment.external_access_token
                };

                $location.path('/associate');

            }
            else {
                //Obtain access token and redirect to orders
                var externalData = { provider: fragment.provider, externalAccessToken: fragment.external_access_token };
                authService.obtainAccessToken(externalData).then(function (response) {

                    $location.path('/orders');
        
                },
             function (err) {
                 $scope.message = err.error_description;
             });
            }

        });
    }
}]);
