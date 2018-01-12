(function () {
    'use strict';
    define(['jquery'], function ($) {
        return ['$scope', function ($scope) {
            /* STATIC VARIABLE - STARTS */
            $scope.isMessageRead = false;
            $scope.oldTitle = "CraZy...";
            $scope.newTitle = "New Message...";
            $scope.interval = null;
            /* STATIC VARIABLE - ENDS */

            /* CHECK USER WHETHER TO LOGIN SCREEEN OR ROOM SCREEN USING USERNAME IN LOCAL STORAGE - STARTS */
            $scope.checkUserStatus = function () {
                if (localStorage.getItem("userName") == null) {
                    $("#user-entry").removeClass("dn");
                    $("#chat-window").addClass("dn");
                } else {
                    $("#chat-window").removeClass("dn");
                    $("#user-entry").addClass("dn");
                }
            };
            /* CHECK USER WHETHER TO LOGIN SCREEEN OR ROOM SCREEN USING USERNAME IN LOCAL STORAGE - ENDS */
            
            /* CHANGE WINDOW TITLE AS "NEW MESSAGE" WHEN ME IDEAL FROM ROOM AND NEW MESSAGE RECEIVED - STARTS */
            $scope.changeTitle = function () {
                document.title = $scope.isMessageRead ? $scope.oldTitle : $scope.newTitle;
                $scope.isMessageRead = !$scope.isMessageRead;
            }
            /* CHANGE WINDOW TITLE AS "NEW MESSAGE" WHEN ME IDEAL FROM ROOM AND NEW MESSAGE RECEIVED - ENDS */

            /* CHANGE WINDOW TITLE AS DEFAULT TITLE WHEN ME ACTIVE THE WINDOW - STARTS */
            $(window).focus(function() {
                $scope.isWindowActive = true;
                clearInterval($scope.interval);
                document.title = $scope.oldTitle;
            });
            /* CHANGE WINDOW TITLE AS DEFAULT TITLE WHEN ME ACTIVE THE WINDOW - ENDS */

            /* TRIGGER WHEN WINDOW IS INACTIVE AND SETUP VALUE AS FALSE (USED TO SET TITLE MESSAGE) - STARTS */
            $(window).blur(function() {
                $scope.isWindowActive = false;
            });
            /* TRIGGER WHEN WINDOW IS INACTIVE AND SETUP VALUE AS FALSE (USED TO SET TITLE MESSAGE) - ENDS */

            /* CHANGE ROOM HEIGHT WHEN WINDOW RESIZED - STARTS */
            $(window).resize(function() {
                $("#chat-box").height($(window).height() - 180);
            });
            /* CHANGE ROOM HEIGHT WHEN WINDOW RESIZED - ENDS */

            /* SETUP USER NAME ON LOGIN SCREEN (ONLY ONCE CALLED) - STARTS */
            $scope.setUserName = function (event) {
                if(event.keyCode == 13){
                    $scope.setupDetails();
                }
            };
            /* SETUP USER NAME ON LOGIN SCREEN (ONLY ONCE CALLED) - ENDS */

            /* CLEAR LOCAL STORAGE AND SHOW LOGIN SCREEN WHEN USER LOGOUT - STARTS */
            $scope.logout = function () {
              socketio.emit("disconnect_user", { userName: localStorage.getItem("userName") });
              localStorage.clear();
              location.reload();
            };
            /* CLEAR LOCAL STORAGE AND SHOW LOGIN SCREEN WHEN USER LOGOUT - ENDS */

            /* SETUP USERNAME, RANDOM UNIQUE NUMBER, SEND NEWLY JOINED MSG TO OTHER USER AND NAVIGATE TO ROOM SCREEN - STARTS */
            $scope.setupDetails = function () {
              localStorage.setItem("userName", $("#userName").val());
              localStorage.setItem("userId", Math.floor((Math.random() * 1000000000000) + 1));
              $scope.checkUserStatus();
              $scope.userJoinedCCMessage();
            };
            /* SETUP USERNAME, RANDOM UNIQUE NUMBER, SEND NEWLY JOINED MSG TO OTHER USER AND NAVIGATE TO ROOM SCREEN - STARTS */

            /* FIX ROOM SIZE ON FIRST TIME VISITING - STARTS */
            $scope.setChatWindowSize = function () {
                $scope.profileName = localStorage.getItem("userName");
                $("#userStatus").html('Alive');
                $scope.userStatus = "Alive";
                $("#chat-box").height($(window).height() - 180);
            };
            /* FIX ROOM SIZE ON FIRST TIME VISITING - ENDS */

            /* CALL ON PAGE LOAD FIRST TIME - STARTS */
            $scope.init = function () {
                $scope.checkUserStatus();
                $scope.setChatWindowSize();
            };
            /* CALL ON PAGE LOAD FIRST TIME - ENDS */

            $scope.init();
        }];
    });
}());