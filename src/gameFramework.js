import $ from "jquery"

export class GameFramework {

    /**
     * This function sets the current frame.
     * @string divId the Id of the div from which you want to change the frame
     * @number frameNumber the frame number
     * @number frameDimension the width of a frame
     */
    static setFrame (divId, frameNumber, frameDimension) {
        $(`#${divId}`)
            .css("backgroundPosition", "" + frameNumber * frameDimension + "px 0px");
    }
}
