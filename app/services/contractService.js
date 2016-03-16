'use strict';
app.factory('contractService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var contractServiceFactory = {};

    var _getContracts = function () {

        return $http.get(serviceBase + 'api/Contracts').then(function (results) {
            return results;
        });
    };


    var _updateContracts = function (contract) {

        var request = $http({
            method: "put",
            url: serviceBase + 'api/Contracts',
            data: contract
        });

        return request.success();
    };


    var _addContract = function (contract, relation) {

        var request = $http({
            method: "post",
            url: serviceBase + 'api/Contracts?relation=' + relation,
            data: contract
        });

        return request.success();
    };

    var _deleteContract = function (id) {

        var request = $http({
            method: "delete",
            url: serviceBase + 'api/Contracts?id=' + id
        });

        return request.success();
    };

    var _inviteToContract = function (contractID, emailAddress, targetRole) {

        var request = $http({
            method: "post",
            url: serviceBase + 'api/Invite?contractID=' + contractID + '&emailAddress=' + emailAddress + '&message=&targetRelation=' + targetRole
        });

        return request.success();
    };

    var _getTransactions = function (contractID) {

        return $http.get(serviceBase + 'api/Transaction?contractId=' +contractID).then(function (results) {
            return results;
        });
    };


    var _addPayment = function (contract, transaction) {

        var request = $http({
            method: "post",
            url: serviceBase + 'api/Transaction?contractId=' + contract + '&relatedSchedule=-1',
            data: transaction
        });

        return request.success();
    };

    contractServiceFactory.getContracts = _getContracts;
    contractServiceFactory.updateContracts = _updateContracts;
    contractServiceFactory.addContract = _addContract;
    contractServiceFactory.deleteContract = _deleteContract;
    contractServiceFactory.inviteToContract = _inviteToContract;
    contractServiceFactory.getTransactions = _getTransactions;
    contractServiceFactory.addPayment = _addPayment;


    return contractServiceFactory;

}]);