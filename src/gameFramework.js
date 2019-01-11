import $ from "jquery"

export class GameFramework {
    static animationHandles = {};

    /**
     * This function sets the current frame.
     * @string divId the Id of the div from which you want to change the frame
     * @number frameNumber the frame number
     * @number frameDimension the width of a frame
     */
    static setFrame (divId, animation) {
        $(`#${divId}`)
            .css("backgroundPosition", "" + animation.currentFrame *
                animation.width + "px 0px");
    }

    animation (options) {
        const defaultValues = {
          url: false,
          width: 64,
            numberOfFrames: 1,
            currentFrame: 0,
            rate: 30
        };
        $.extend(this, defaultValues, options);
    }

    /**
     * Sets the animation for the given sprite.
     */
    setAnimation (divId, animation, loop) {
        if (GameFramework.animationHandles[divId]) {
            clearInterval(GameFramework.animationHandles[divId]);
        }

        if (animation.url) {
            $(`#${divId}`).css('backgroundImage', `url(${animation.url})`);
        }

        if (animation.numberOfFrames > 1) {
            GameFramework.animationHandles[divId] = setInterval(() => {
                animation.currentFrame++;
                if (!loop && currentFrame > animation.numberOfFrames) {
                    clearInterval(GameFramework.animationHandles[divId]);
                    GameFramework.animationHandles[divId] = false;
                } else {
                    animation.currentFrame %= animation.numberOfFrames;
                    GameFramework.setFrame(divId, animation);
                }
            }, animation.rate);
        }
    }
}
