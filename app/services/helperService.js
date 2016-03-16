'use strict';
app.factory('helperService', ['$http', '$q', 'localStorageService', 'ngAuthSettings', function ($http, $q, localStorageService, ngAuthSettings) {

    var helperServiceFactory = {};

    var _filterDateTime = function ($filter) {
        return function (date, format) {
            if (date) {
                return moment(Number(date)).format(format || "DD/MM/YYYY h:mm A");
            }
            else
                return "";
        };
    };

    helperServiceFactory.filterDateTime = _filterDateTime;   

    return helperServiceFactory;
}]);