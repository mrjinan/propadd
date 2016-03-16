'use strict';
app.factory('clientService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var clientServiceFactory = {};

    var _getClientDetails = function () {

        return $http.get(serviceBase + 'api/Client').then(function (results) {
            return results;
        });
    };


    var _updateClientDetails = function (client) {

        var request = $http({
            method: "put",
            url: serviceBase + 'api/Client',
            data: client
        });

        return request.success();
    };


    var _deleteClientDetails = function (id) {

        var request = $http({
            method: "delete",
            url: serviceBase + 'api/Client?id=' + id,
            data: client
        });

        return request.success();
    };


    clientServiceFactory.getClientDetails = _getClientDetails;
    clientServiceFactory.updateClientDetails = _updateClientDetails;
    clientServiceFactory.deleteClientDetails = _deleteClientDetails;


    return clientServiceFactory;

}]);
