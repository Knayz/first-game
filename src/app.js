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

        GF.addSprite("container","background",{width: 640, height: 480});
        GF.addSprite("container","packets1",{width: 640, height: 40, y: 400});
        GF.addSprite("container","packets2",{width: 640, height: 40, y: 330});
        GF.addSprite("container","packets3",{width: 640, height: 40, y: 260});
        GF.addSprite("container","bugs1",{width: 640, height: 40, y: 170});
        GF.addSprite("container","bugs2",{width: 640, height: 40, y: 100});
        GF.addSprite("container","bugs3",{width: 640, height: 40, y: 30});

        GF.addSprite("container","player",{width: 40, height: 40, y: 440,
            x: 260});
        GF.setAnimation("background", backgroundAnim);
        GF.setAnimation("player", playerAnim);
        GF.setAnimation("packets1", networkPacketsAnim);
        GF.setAnimation("packets2", networkPacketsAnim);
        GF.setAnimation("packets3", networkPacketsAnim);
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
        var newPos = GF.x("player");
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
        GF.x("player", newPos);
    };

    $(document).keydown(function(e){
        if(gameState !== "WON" && gameState !== "GAMEOVER"){
            switch(e.keyCode){
                case 37: //left
                    GF.x("player",GF.x("player") - 5);
                    break;
                case 39: // right
                    GF.x("player",GF.x("player") + 5);
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


    var detectSafe = function(state){
        switch(state){
            case "LINE1":
                var relativePosition = (gf.x("player") - packets1.
                    position) % 230;
                relativePosition = (relativePosition < 0) ?
                    relativePosition + 230: relativePosition;
                if(relativePosition > 110 && relativePosition < 210) {
                    return true;
                } else {
                    return false;
                }
                break;
            /* and so on */
            case "LINE4":
                var relativePosition = (gf.x("player") - bugs1.position) %
                    190;
                relativePosition = (relativePosition < 0) ?
                    relativePosition + 190: relativePosition;
                if(relativePosition < 130) {
                    return true;
                } else {
                    return false;
                }
                break;
            /* and so on */
        }
        return true;
    }
    var life = 3;
    var kill = function (){
        life--;
        if(life == 0) {
            gameState = "GAMEOVER";
            $("#lifes").html("Game Over!");
        } else {
            $("#lifes").html("life: "+life);
            switch(gameState){
                case "START":
                case "LINE1":
                case "LINE2":
                case "LINE3":
                    gf.x("player", 260);
                    gf.y("player", 440);
                    gameState = "START";
                    break;
                case "REST":
                case "LINE4":
                case "LINE5":
                case "LINE6":
                    gf.x("player", 260);
                    gf.y("player", 220);
                    gameState = "REST";
                    break;
            }
        }
    }
    var newPos = gf.x("player");
    switch(gameState){
        case "LINE1":
            newPos += packets1.speed;
            break;
        /* and so on */
    }
    if(newPos > screenWidth || newPos < -40){
        kill();
    } else {
        if(!detectSafe(gameState)){
            kill();
        }
        gf.x("player", newPos);
    }
});
