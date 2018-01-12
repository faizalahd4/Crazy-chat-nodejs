(function () {
    "use strict";
    define(['jquery', 'scrollbar'], function ($) {
        return [function () {
            return {
                restrict: 'E',
                templateUrl: '../../html/audio-troll.html',
                scope: {
                    showTag: '='
                },
                link: function ($scope) {
                    console.log("Show audio troll - " + $scope.showTag);
                    $scope.$watch('showTag', function () {
                        console.log("Show audio troll - " + $scope.showTag);
                    });
                    $scope.sendAudioTroll = function (wavesrc) {
                        $("#wave-troll-container").slideToggle();
                        $("#hiddenMessage").val("<audio controls id='custome-audio'><source src='" + wavesrc + "' type='audio/mpeg'>Your browser does not support the audio element.</audio>");
                        $scope.loadProcess();
                    };
                    $("#wave-troll-container").mCustomScrollbar();
                }
            };
        }];
    });
}());