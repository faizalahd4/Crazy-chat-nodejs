window.onload = function() {
        var myCanvas = document.getElementById("myCanvas");
        var curColor = $('.colors li .selected').data("color");
        if(myCanvas){
            var isDown      = false;
            var ctx = myCanvas.getContext("2d");
            var canvasX, canvasY;
            ctx.lineWidth = 5;
            $(myCanvas)
            .mousedown(function(e){
                            isDown = true;
                            ctx.beginPath();
                            canvasX = e.pageX - myCanvas.offsetLeft - 73;
                            canvasY = e.pageY - myCanvas.offsetTop - 83;
                            ctx.moveTo(canvasX, canvasY);
            })
            .mousemove(function(e){
                            if(isDown != false) {
                                    canvasX = e.pageX - myCanvas.offsetLeft - 73;
                                    canvasY = e.pageY - myCanvas.offsetTop - 83;
                                    ctx.lineTo(canvasX, canvasY);
                                    ctx.strokeStyle = curColor;
                                    ctx.stroke();
                            }
            })
            .mouseup(function(e){
                            isDown = false;
                            ctx.closePath();
            });
        }
        $('.colors li span').click(function () {
          curColor = $(this).data("color");
          $('.colors li span').removeClass("selected");
          $(this).addClass("selected");
        });
        $('#saveDraw').click(function () {
          var dataURL = myCanvas.toDataURL();
          $("#hiddenMessage").val("<img src='" + dataURL + "' class='chat-board'>");
          setCCMessage();
          $(".modal__close").on("click");
          $(".modal__close").trigger("click");
        });
        $("#openBoard").click(function(){
            ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
        })
};