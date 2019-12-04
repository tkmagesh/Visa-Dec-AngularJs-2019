 var utilsModule = angular.module('utilsModule', []);

        utilsModule.value('defaultMaxLength', 30);

        utilsModule.filter('trimText', function (defaultMaxLength) {
            return function (data, maxLength) {
                maxLength = maxLength || defaultMaxLength;
                return data.length <= maxLength ? data : data.substr(0, maxLength) + '...';
            };
        });
        utilsModule.filter('elapsed', function () {
            return function (dateValue) {
                return moment(dateValue).fromNow();
            };
        });