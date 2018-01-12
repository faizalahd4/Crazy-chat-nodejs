(function () {
    "use strict";
    define(['jquery', 'scrollbar'], function ($) {
        return [function () {
            return {
                restrict: 'E',
                templateUrl: '../../html/smiley.html',
                scope: {
                    showTag: '=',
                    options: '='
                },
                link: function ($scope) {
                    $("#smiley1").removeClass("dn");
                    $scope.sendSmiley = function (smileysrc) {
                        $("#ccMessageSubmit").html($("#ccMessageSubmit").html() + " " + "<img src='" + smileysrc + "' class='smiley'/>");
                        $("#ccMessageSubmit").focus();
                    };
                    $scope.toggleSmiley = function (tagId) {
                        $(".smiley-all").addClass("dn");
                        $("#" + tagId).removeClass("dn");
                    };
                    $(".smiley-content").mCustomScrollbar();
                }
            };
        }];
    });
}());