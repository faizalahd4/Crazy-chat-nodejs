(function () {
    "use strict";
    define(['jquery', 'scrollbar'], function ($) {
        return [function () {
            return {
                restrict: 'E',
                templateUrl: '../../html/photo-troll.html',
                scope: {
                    loadProcess: '&',
                },
                link: function ($scope) {
                    $scope.sendPhotoTroll = function (imgsrc) {
                        $("#photo-troll-container").slideUp();
                        $("#hiddenMessage").val("<img src='" + imgsrc + "' class='chat-photo-troll'>");
                        $scope.loadProcess();
                    };
                    $scope.close = function () {
                        $("#photo-troll-container").slideUp();
                    };
                    $("#photo-troll-list").mCustomScrollbar();
                }
            };
        }];
    });
}());