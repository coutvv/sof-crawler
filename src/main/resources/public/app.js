var app = angular.module('sofCrawler', []);

app.controller('sofCtrl', function($scope, $http) {

    var url="/sof-true-data?title=";

    $scope.page = 1;
    $scope.hasMoreResults = false;

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
        var more = "&page=" + $scope.page;
        $http.get(url + $scope.sof_title + more)
                     .then(function(response) {
                            var data = response.data;
//                            $scope.items.concat(data.items);
                            data.items.forEach(function(item) {
                                $scope.items.push(item);
                            });
                            console.log($scope.items);
                            $scope.page++;
                            $scope.hasMoreResults = data.has_more;
                     });
    }
});