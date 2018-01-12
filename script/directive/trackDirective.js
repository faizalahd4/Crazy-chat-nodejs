(function () {
    "use strict";
    define(['jquery', 'scrollbar'], function ($) {
        return [function () {
            return {
                restrict: 'E',
                templateUrl: '../../html/audio-track.html',
                link: function ($scope) {
                  $scope.play = function ($event) {
                    $("#songs li").removeClass("active");
                    $($event.currentTarget).parent().addClass("active");
                    var audio = document.getElementById('audio');
                    var source = document.getElementById('oggSource');
                    source.src= $($event.currentTarget).parent().data("songurl");
                    source = document.getElementById('mpegSource');
                    source.src= $($event.currentTarget).parent().data("songurl");
                    audio.load();
                    audio.play();
                    $("#audio-box").slideToggle();
                  };
                  $scope.pause = function () {
                    var audio = document.getElementById('audio');
                    audio.pause(); 
                  };
                  $scope.close = function () {
                    $("#audio-box").slideToggle();
                  };
                  $("#songs").mCustomScrollbar();
                }
            };
        }];
    });
}());