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
});
