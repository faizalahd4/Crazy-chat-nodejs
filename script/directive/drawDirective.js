(function () {
    "use strict";
    define(['jquery', 'scrollbar'], function ($) {
        return [function () {
            return {
                restrict: 'E',
                templateUrl: '../../html/board.html',
                scope: {
                    loadProcess: '&',
                },
                link: function ($scope) {
                    console.log("Show board troll - " + $scope.showTag);
                    $scope.$watch('showTag', function () {
                        console.log("Show board troll - " + $scope.showTag);
                    });
                    $scope.sendBoard = function (imgsrc) {
                        $("#photo-troll-container").slideToggle();
                        $("#hiddenMessage").val("<img src='" + imgsrc + "' class='chat-photo-troll'>");
                        $scope.loadProcess();
                    };
                    $("#photo-troll-container").mCustomScrollbar();
                }
            };
        }];
    });
}());