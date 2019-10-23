/* This script will click all the remove buttons on your YouTube playlist
at a rate of 5/second*, provided that the whole playlist is loaded in the
browser. If it spans multiple pages, you'll need to run this multiple times.
(Sorry, I've never had a playlist that long.)

*This is the fastest speed at which it's worked reliably for me, you can
experiment with it if you want to. */

// 1. Open your playlist in Chrome or Firefox
// 2. Click EDIT next to your profile picture
// 3. Open the browser's JavaScript console
//  - Chrome: cmd-alt-J (Mac) / ctrl-shift-J (Windows)
//  - Firefox: cmd-shift-J (Mac) / ctrl-shift-J (Windows)
// 4. Paste this code in:

var removePerSecond = 5; // Tweak this number if you want to
var keepTheLast = 0; // Set this number to keep the last N videos
var removeButtons = document.querySelectorAll(".pl-video-edit-remove");
var willRemove = removeButtons.length-keepTheLast;
var confirmed = prompt(
    `We're about to remove ${willRemove} videos from your playlist. ` +
    `This can not be undone. ` +
    `Type "YES" to proceed, or "Oh my God, please no!" to cancel.`
)
if (confirmed === "YES") {
    for (let i = 0; i < willRemove; i++) {
        setTimeout(
            ()=>removeButtons[i].click(),
            1000/removePerSecond * i
        )
    }
    console.log(
        `Removing videos... ` +
        `This should take about ${willRemove/removePerSecond} seconds.`)
} else {
    console.log("No videos were removed.")
}

// 5. Press Enter, confirm and watch the videos disappear
