import $ from "jquery";
import GF from "gameFramework"

$(() => {
    const backgroundAnim = new GF.animation({
        url : "back.png"
    });
    const frontAnim = new GF.animation({
        url: "front.png"
    });
    const networkPacketsAnim = new GF.animation({
        url : "packet.png"
    });
    const bugsAnim = new GF.animation({
        url : "bug.png"
    });
    const playerAnim = new GF.animation({
        url : "player.png"
    });

    const initalize = () => {
        $("#mygame").append("<div id='container' style='display:none;' width: 640px; height: 480px;'>");

        gf.addSprite("container","background",{width: 640, height: 480});
        gf.addSprite("container","packets1",{width: 640, height: 40, y:
                400});
        /* and so on */
        GF.addSprite("container","player",{width: 40, height: 40, y: 440,
            x: 260});
        GF.setAnimation("background", backgroundAnim);
        GF.setAnimation("player", playerAnim);
        GF.setAnimation("packets1", networkPacketsAnim);
        /* and so on */
        $("#startButton").remove();
        $("#container").append("<div id='lifes' style='position: relative; color: #FFF;'>life: 3</div>").css("display", "block");
        setInterval(gameLoop, 100);
    }

    $("#startButton").on("click", () => {
        GF.startPreloading(initialize);
    });

    var screenWidth = 640;
    var packets1 = {
        position: 300,
        speed: 3
    }
    /* and so on */
    var gameState = "START";
    var gameLoop = function() {
        packets1.position += packets1.speed;
        $("#packets1").css("background-position",""+ packets1.position
            +"px 0px");
        /* and so on */
        var newPos = gf.x("player");
        switch(gameState){
            case "LINE1":
                newPos += packets1.speed;
                break;
            case "LINE2":
                newPos += packets2.speed;
                break;
            case "LINE3":
                newPos += packets3.speed;
                break;
        }
        gf.x("player", newPos);
    };

    $(document).keydown(function(e){
        if(gameState != "WON" && gameState != "GAMEOVER"){
            switch(e.keyCode){
                case 37: //left
                    gf.x("player",gf.x("player") - 5);
                    break;
                case 39: // right
                    gf.x("player",gf.x("player") + 5);
                    break;
                case 38: // jump
                    switch(gameState){
                        case "START":
                            $("#player").animate({top: 400},function()
                            {
                                gameState = "LINE1";
                            });
                            break;
                        case "LINE1":
                            $("#player").animate({top: 330},function()
                            {gameState = "LINE2";
                            });
                            break;
                        /* and so on */
                        case "LINE6":
                            $("#player").animate({top: 0},function(){
                                gameState = "WON";
                                $("#lifes").html("You won!");
                            });
                            break;
                    }
            }
        }
    });
});
