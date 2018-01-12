(function () {
    'use strict';
    define(['jquery'], function ($) {
        return ['$scope', function ($scope) {
          /* STATIC VARIABLE - STARTS */
          $scope.isWindowActive = true;
          /* STATIC VARIABLE - ENDS */

          /* SOCKET USED TO LISTEN FOR USER MESSAGE - STARTS */
          socketio.on("message_to_client", function(data) {
              var ccDate = new Date(data['messageDate']);
              ccDate = ((ccDate.getHours() % 12 == 0) ? ccDate.getHours() : (ccDate.getHours() % 12)) + ":"+ (ccDate.getMinutes()<10?'0':'') + ccDate.getMinutes() + ((ccDate.getHours() > 12) ? " PM" : " AM");
              if (data['userId'] == localStorage.getItem("userId")) {
                $("#chat-box").append("<div class='chat-container'><div class='ccMessageBox ccMessageBox-left fr' style='background:#1abc9c;color:#fff;border:0'><div class='chat-time' style='color:#fff;text-align:left'>" + ccDate + "</div><p class='chat-msg'>" + $.trim(data['message']) + "</p></div><div class='cl'></div></div>");
              } else {
                $scope.sound();
                $("#chat-box").append("<div class='chat-container'><div class='ccMessageBox ccMessageBox-right'><span class='chat-name'><i class='fa fa-user'></i>&nbsp;&nbsp;"+data['userName']+"<span class='chat-time fr' style='padding-left:20px'>" + ccDate + "</span></span>&nbsp;<p class='chat-msg' style='color:#777873 !important;'>" + $.trim(data['message']) + "</p></div><div class='cl'></div></div>");
              }
              $("#chat-box").animate({ scrollTop: $('#chat-box').prop("scrollHeight")}, 1000);
              /*if(!$scope.isWindowActive) {
                 interval = setInterval($scope.changeTitle(), 1000);
              }*/
          });
          /* SOCKET USED TO LISTEN FOR USER MESSAGE - ENDS */

          /* SOCKET USED TO SEND USER MESSAGE TO OTHER USER - STARTS */
          $scope.setCCMessage = function () {
              if($scope.formatMessage($("#ccMessageSubmit").html()) != "" ) {
                  socketio.emit("message_to_server", {
                      userName: localStorage.getItem("userName"),
                      message : $scope.formatMessage($("#ccMessageSubmit").html()),
                      messageDate: new Date(),
                      userId: localStorage.getItem("userId")
                  });
              }
              else if ($("#hiddenMessage").val() !== "") {
                  socketio.emit("message_to_server", {
                      userName: localStorage.getItem("userName"),
                      message : $scope.formatMessage($("#hiddenMessage").val()),
                      messageDate: new Date(),
                      userId: localStorage.getItem("userId")
                  });
              }
              $("#ccMessageSubmit").text("");
          };
          /* SOCKET USED TO SEND USER MESSAGE TO OTHER USER - ENDS */

          /* FORMAT THE MESSAGE BEFORE SENDING TO OTHER USER THROUGH SOCKET - STARTS */
          $scope.formatMessage = function (message) {
              message = message.replace("<div><br></div>", "");
              message = message.replace("<div><br></div>", "");
              return message;
          };
          /* FORMAT THE MESSAGE BEFORE SENDING TO OTHER USER THROUGH SOCKET - ENDS */

          /* SEND MESSAGE WHEN NEW USER JOINED THE ROOM THROUGH SOCKET (STATIC MESSAGE) - STARTS */
          $scope.userJoinedCCMessage = function (message) {
            socketio.emit("user_joined_server", { userName: localStorage.getItem("userName") });
            $("#ccMessageSubmit").text("");
            $scope.profileName = localStorage.getItem("userName");
            $scope.userStatus = "Alive";
          };
          /* SEND MESSAGE WHEN NEW USER JOINED THE ROOM THROUGH SOCKET (STATIC MESSAGE) - ENDS */

          /* TRIGGER SOUND WHEN NEW MESSAGE ARRIVED - STARTS */
         $scope.sound = function () {
              var snd = new Audio("script/beep/message-sound.mp3");
              snd.play();          
         };
         /* TRIGGER SOUND WHEN NEW MESSAGE ARRIVED - ENDS */

         /* SEND MESSAGE ON ENTER KEY PRESSED TO ANOTHER METHOD setCCMessage  - STARTS */
         $scope.sendMessage = function (event) {
              if(event.keyCode == 13){
                  $scope.setCCMessage();
                  $scope.showSmiley = false;
              }
         };
         /* SEND MESSAGE ON ENTER KEY PRESSED TO ANOTHER METHOD setCCMessage  - ENDS */

         /* SEND TRIGGER MESSAGE WHEN USER STOP TYPING AND WON'T SHOW 'TYPING...' TO OTHER USER THROUGH SOCKET  - STARTS */
         $scope.isUserNotTyping = function () {
              socketio.emit("is_type_server", { userName: localStorage.getItem("userName"), typeToken: false });
         };
         /* SEND TRIGGER MESSAGE WHEN USER STOP TYPING AND WON'T SHOW 'TYPING...' TO OTHER USER THROUGH SOCKET  - STARTS */

         /* SEND TRIGGER MESSAGE WHEN USER START TYPING AND WILL SHOW 'TYPING...' TO OTHER USER THROUGH SOCKET  - STARTS */
         $scope.isUserTyping = function () {
              socketio.emit("is_type_server", { userName: localStorage.getItem("userName"), typeToken: true });
         };
         /* SEND TRIGGER MESSAGE WHEN USER START TYPING AND WILL SHOW 'TYPING...' TO OTHER USER THROUGH SOCKET  - STARTS */

         /* RECEIVE TRIGGER MESSAGE WHEN OTHER USER START / STOP TYPING AND WILL RECEIVE 'TYPING...' / 'ONLINE' TO MINE THROUGH SOCKET  - STARTS */
         socketio.on("is_type_client", function(data) {
            if(data['typeToken'] && data['typeToken'] !== undefined && localStorage.getItem('userName') !== data['userName']) {
              $("#userStatus").html(data['userName'] + ' is typing...');
              return;
            } else if (!data['typeToken']) {
              $("#userStatus").html('Alive');
            }
         });
         /* RECEIVE TRIGGER MESSAGE WHEN OTHER USER START / STOP TYPING AND WILL RECEIVE 'TYPING...' / 'ONLINE' TO MINE THROUGH SOCKET  - ENDS */
          
        /* RECEIVE MESSAGE WHEN OTHER USER LEFT THE CHAT AND SHOW MESSAGE AS "USER LEFT THE CHAT" (STATIC MSG FROM SERVER) THROUGH SOCKET  - STARTS */
        socketio.on("user_quit", function(data) {
          $("#chat-box").append('<div class="chat-container"><center><div class="ccMessageBox ccMessageBox-red"><p class="chat-msg" style="color:#363636 !important;"><i class="fa fa-user"></i> ' + data['userName'] + ' ' + $.trim(data['message']) + '</p></div></center><div class="cl"></div></div>');
        });
        /* RECEIVE MESSAGE WHEN OTHER USER LEFT THE CHAT AND SHOW MESSAGE AS "USER LEFT THE CHAT" (STATIC MSG FROM SERVER) THROUGH SOCKET  - ENDS */

        /* RECEIVE MESSAGE WHEN OTHER USER JOINED THE CHAT AND SHOW MESSAGE AS "USER JOINED THE CHAT" (STATIC MSG FROM SERVER) THROUGH SOCKET  - STARTS */
        socketio.on("user_joined_client", function(data) {
          $("#chat-box").append('<div class="chat-container"><center><div class="ccMessageBox ccMessageBox-green"><p class="chat-msg" style="color:#363636 !important;"><i class="fa fa-user"></i> ' + data['userName'] + ' ' + $.trim(data['message']) + '</p></div></center><div class="cl"></div></div>');
        });
        /* RECEIVE MESSAGE WHEN OTHER USER JOINED THE CHAT AND SHOW MESSAGE AS "USER JOINED THE CHAT" (STATIC MSG FROM SERVER) THROUGH SOCKET  - ENDS */

      }];
    });
}());