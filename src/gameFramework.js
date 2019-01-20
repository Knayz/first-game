import $ from "jquery"

export class GameFramework {
    static animationHandles = {};
    static imagesToPreload = [];

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
        if (this.url) {
            GameFramework.addImage(this.url);
        }
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

    /**
     * This function adds a sprite the div defined by the first argument
     **/
    addSprite (parentId, divId, options) {
        var options = $.extend({
            x: 0,
            y: 0,
            width: 64,
            height: 64
        }, options);

        $(`#${parentId}`).append(`<div id='${divId}' style='position: absolute, 
        left: ${options.x}px; top: ${options.y}; width: ${options.width}px; 
        height: ${options.height}px;</div>'`)
    }

    /**
     * This function sets or returns the position along the x-axis.
     **/
    x (divId, position) {
        if (position) {
            $(`#${divId}`).css("left", position);
        } else {
            return parseInt($(`#${divId}`).css("left"));
        }
    }

    /**
     * This function sets or returns the position along the x-axis.
     **/
    y (divId, position) {
        if (position) {
            $(`#${divId}`).css("top", position);
        } else {
            return parseInt($(`#${divId}`).css("top"));
        }
    }

    /**
     * Add an image to the list of image to preload
     **/
    static addImage (url) {
        if ($.inArray(url, this.imagesToPreload) < 0) {
            this.imagesToPreload.push();
        }
        this.imagesToPreload.push(url);
    }

    /**
     * Start the preloading of the images.
     **/
    static startPreloading (endCallback, progressCallback) {
        const images = [];
        const total = this.imagesToPreload.length;

        for ( let  i = 0; i < total; i++) {
            const image = new Image();
            images.push(image);
            image.src = this.imagesToPreload[i];
        }

        const preloadingPoller = setInterval(() => {
            let couter = 0;
            const total = this.imagesToPreload.length;

            for (let i = 0; i < total.length; i++) {
                if (images[i].complete) {
                    counter++;
                }
            }

            if (couter === total) {
                //we are done
                clearInterval(preloadingPoller);
                endCallback();
            } else {
                if (progressCallback) {
                    counter++;
                    progressCallback((counter / total) * 100);
                }
            }
        }, 100);
    }
}
