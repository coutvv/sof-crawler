var app = angular.module('sofCrawler', []);

app.controller('sofCtrl', function($scope, $http) {

    var url="/sof-true-data?title=";

    $scope.page = 1;
    $scope.hasMoreResults = false;
    $scope.sof_title = "";

    $scope.search = function() {
        $scope.page = 1;
        var more = "&page=" + $scope.page;

        $http.get(url + $scope.sof_title + more)
             .then(function(response) {
                    var data = response.data;
                    console.log(data);
                    $scope.items = data.items;

                    $scope.hasMoreResults = data.has_more;
             });
    }

    $scope.toDate = function(date) {
        return (new Date(date * 1000)).format('yyyy.mm.dd');
    }

    $scope.moreResults = function() {
        $scope.page++;
        var more = "&page=" + $scope.page;
        $http.get(url + $scope.sof_title + more)
                     .then(function(response) {
                            var data = response.data;
                            data.items.forEach(function(item) {
                                $scope.items.push(item);
                            });
                            console.log($scope.items);
                            $scope.hasMoreResults = data.has_more;
                     });
    }
});