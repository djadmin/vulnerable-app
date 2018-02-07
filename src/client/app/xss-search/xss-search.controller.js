(function() {
    'use strict';

    angular
        .module('app.xss-search')
        .controller('XssSearchController', XssSearchController);

    XssSearchController.$inject = ['$q', '$sanitize', '$sce', 'dataservice', 'logger', '$location',
    '$scope', '$timeout'];
    /* @ngInject */
    function XssSearchController($q, $sanitize, $sce, dataservice, logger, $location,
        $scope, $timeout) {
        var vm = this;
        vm.title = 'XSS Search';
        vm.search = search;
        vm.searchResults = undefined;

        $timeout(function () {
            $scope.searchTerm = $location.hash();
            vm.search($scope.searchTerm);
        }, 1000);

        activate();

        function activate() {
            logger.info('Activated XSS Search View');
        }

        function search(searchTerm) {
            dataservice.search(searchTerm)
                .then(function(response) {
                    // Intentionally trusting as HTML for demonstration purposes
                    console.log('Search response: ', response);
                    $location.hash(response);
                    vm.searchResults = $sce.trustAsHtml(response);
                })
                .catch(function(error) {
                    logger.error(error);
                });
        }
    }
})();
