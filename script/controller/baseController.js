(function () {
    'use strict';
    define(['jquery', 'scrollbar', 'mmenu'], function ($) {
        return ['$scope', '$controller', '$http', function ($scope, $controller, $http) {         
            /* INHERIT OTHER CONTROLLER - STARTS */   
            $controller('socketController', {$scope: $scope});
            $controller('userController', {$scope: $scope});
            /* INHERIT OTHER CONTROLLER - ENDS */   

            /* STATIC VARIABLE - STARTS */
            $scope.showSmiley = false;
            $scope.showAudioTroll = false;
            $scope.showAttachmentMenu = false;
            $scope.statusPrivacy = 'Everyone';
            $scope.dpPrivacy = 'Everyone';
            $scope.lastSeen = 'Everyone';
            $scope.themeColor = 'GreenSea';
            $scope.mute = 'off';
            $scope.notification = 'off';
            $scope.fontSize = 'Large';
            $scope.smileyList = [];
            /* STATIC VARIABLE - ENDS */

            $scope.range = function(min, max, step){
                step = step || 1;
                var input = [];
                for (var i = min; i <= max; i += step) input.push(i);
                return input;
            };

            /* OPEN OTHER LAYOUT - STARTS */
            $scope.openContainer = function(oldContainer, newContainer){
                $("#" + oldContainer).slideUp();
                $("#" + newContainer).slideToggle();
            };
            /* OPEN OTHER LAYOUT - ENDS */

            /* CHANGE THEME COLOR - STARTS */
            $scope.changeTheme = function(className){
                $scope.themeColor = className;
                $("header").addClass(className);
            };
            /* CHANGE THEME COLOR - ENDS */

            /* CHANGE FONT SIZE - STARTS */
            $scope.changeFontSize = function(fontSize){
                $scope.fontSize = fontSize;
                $(".chat-msg").css("font-size", fontSize);
            };
            /* CHANGE FONT SIZE - ENDS */

            /* MUTE THE SOUND - STARTS */
            $scope.changeMute = function(isMute){
                $scope.mute = (isMute) ? "on" : "off";
                document.getElementById('audio').muted = isMute;
            };
            /* MUTE THE SOUND - ENDS */

            /* MUTE THE NOTIFICATION - STARTS */
            $scope.changeNotification = function(isMute){
                $scope.notification = (isMute) ? "on" : "off";
                document.getElementById('audio').muted = isMute;
            };
            /* MUTE THE NOTIFICATION - ENDS */

            /* CHANGE USER NAME - STARTS */
            $scope.changeName = function(newName){
                $scope.profileName = newName;
                localStorage.setItem("userName", newName);
            };
            /* CHANGE USER NAME - ENDS */

            /* UPDATE PRIVACY IN SCOPE - STARTS */
            $scope.changePrivacy = function(type, valueScope){
                if (valueScope == 'statusPrivacy') {
                    $scope.statusPrivacy = type;
                } else if (valueScope == 'dpPrivacy') {
                    $scope.dpPrivacy = type;
                } else if (valueScope == 'lastSeen') {
                    $scope.lastSeen = type;
                }
            };
            /* UPDATE PRIVACY IN SCOPE - ENDS */

            /* FETCH SMILEY LIST - STARTS */
            $scope.getSmileyList = function(){
                $http.get("smiley").then(function(response) {
                    $scope.smileyList = response.data.fileName;
                    $scope.smileyList.shift();console.log($scope.smileyList);
                });
            };
            /* FETCH SMILEY LIST - ENDS */

            /* CALL ON PAGE LOAD FIRST TIME - STARTS */
            $scope.initBase = function () {
                $scope.getSmileyList();
            };
            /* CALL ON PAGE LOAD FIRST TIME - ENDS */

            $scope.initBase();
        }];
    });
}());