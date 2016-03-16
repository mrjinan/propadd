'use strict';


app.controller('DashCtrl', ['$scope','authService', 'contractService', 'helperService', function ($scope,authService, contractService, helperService) {

    $scope.contracts = null;

    var contract = {
        // "recordId": 0,
        "schedules": [
          {
              "description": "string",
              "scheduledAmount": 230,
              "currency": "USD",
              "startDate": "2016-02-04T21:52:12.567Z",
              "endDate": "2017-02-04T21:52:12.567Z",
              "period": 2,
              "paymentDueAdvance": {
                  "count": 7,
                  "period": 1
              },

          }
        ],
        "endDate": "2016-02-04T21:52:12.569Z",
        "startDate": "2016-02-04T21:52:12.569Z",
        "property": {
            "address": {
                "addressFirstLine": "addressFirstLine",
                "addressSecondLine": "addressSecondLine",
                "addressThridLine": "addressThridLine",
                "county": "2",
                "country": "UK",
                "state": "NA",
                "postCode": "12345"
            },
        },
        "actors": [
          {
              "relation": 0,    // Tennant = 0, LandLord = 1, Agent = 2
              "client": { "userId": authService.authentication.userName }
          }
        ],

    };

    //$scope.emailInvite = '';

    $scope.populateForm = function () {

        contractService.getContracts().then(function (results) {

            $scope.contracts = results.data;
            $scope.$apply()
            
            $scope.contracts.forEach(function (con) {
                contractService.getTransactions(con.recordId).then(function (result) {
                    con.transactions = result.data;
                });
            });

            //document.getElementById("addressFirstLine").value = $scope.client.address && $scope.client.address.addressFirstLine || '';
            //document.getElementById("emailContact").value = $scope.client.contact && $scope.client.contact[0].emailAddress;

            //_populateFields($scope.client, null);


        }, function (error) {
            alert(error.data.message);
        });
    };

    $scope.updateContract = function (contract) {

        contractService.updateContracts(contract).then(function (results) {

          //  $scope.contracts = results.data;
           // $scope.$apply()
            $scope.populateForm();
            //document.getElementById("addressFirstLine").value = $scope.client.address && $scope.client.address.addressFirstLine || '';
            //document.getElementById("emailContact").value = $scope.client.contact && $scope.client.contact[0].emailAddress;

            //_populateFields($scope.client, null);


        }, function (error) {
            alert(error.data.message);
        });
    };

    $scope.deleteContract = function (contract) {

        contractService.deleteContract(contract.recordId).then(function (results) {

            //  $scope.contracts = results.data;
            // $scope.$apply()
            $scope.populateForm();
            //document.getElementById("addressFirstLine").value = $scope.client.address && $scope.client.address.addressFirstLine || '';
            //document.getElementById("emailContact").value = $scope.client.contact && $scope.client.contact[0].emailAddress;

            //_populateFields($scope.client, null);


        }, function (error) {
            alert(error.data.message);
        });
    };

    $scope.addContract = function (contract) {

        contractService.addContract(contract,'TENANT').then(function (results) {

            //  $scope.contracts = results.data;
            // $scope.$apply()
            $scope.populateForm();
            //document.getElementById("addressFirstLine").value = $scope.client.address && $scope.client.address.addressFirstLine || '';
            //document.getElementById("emailContact").value = $scope.client.contact && $scope.client.contact[0].emailAddress;

            //_populateFields($scope.client, null);


        }, function (error) {
            alert(error.data.message);
        });
    };

    $scope.addDummyContract = function () {

        

        contractService.addContract(contract, 'TENANT').then(function (results) {

            //  $scope.contracts = results.data;
            // $scope.$apply()
            $scope.populateForm();
            //document.getElementById("addressFirstLine").value = $scope.client.address && $scope.client.address.addressFirstLine || '';
            //document.getElementById("emailContact").value = $scope.client.contact && $scope.client.contact[0].emailAddress;

            //_populateFields($scope.client, null);


        }, function (error) {
            alert(error.data.message);
        });
    };

    $scope.inviteContract = function (contract,address) {

        contractService.inviteToContract(contract.recordId, address, 'TENANT').then(function (results) {

            //  $scope.contracts = results.data;
            // $scope.$apply()
            $scope.populateForm();
            //document.getElementById("addressFirstLine").value = $scope.client.address && $scope.client.address.addressFirstLine || '';
            //document.getElementById("emailContact").value = $scope.client.contact && $scope.client.contact[0].emailAddress;

            //_populateFields($scope.client, null);


        }, function (error) {
            alert(error.data.message);
        });
    };

    $scope.addPayment = function (contractId, amount) {

        var transaction = { totalAmount: amount, invoiceClient: { recordId : 1,SecondName : "John"  } }
        contractService.addPayment(contractId, transaction).then(function (results) {

            //  $scope.contracts = results.data;
            // $scope.$apply()
            $scope.populateForm();
            //document.getElementById("addressFirstLine").value = $scope.client.address && $scope.client.address.addressFirstLine || '';
            //document.getElementById("emailContact").value = $scope.client.contact && $scope.client.contact[0].emailAddress;

            //_populateFields($scope.client, null);


        }, function (error) {
            alert(error.data.message);
        });
    };

    $scope.populateForm();
    
}]);