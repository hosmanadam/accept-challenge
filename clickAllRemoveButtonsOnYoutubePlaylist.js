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

const REMOVE_PER_SECOND = 5; // Tweak this number if you want to
const KEEP_THE_LAST = 0; // Set this number to keep the last N videos
let removeButtons = document.querySelectorAll(".pl-video-edit-remove");
for (let i = 0; i < removeButtons.length-KEEP_THE_LAST; i++) {
    setTimeout(
        ()=>removeButtons[i].click(),
        1000/REMOVE_PER_SECOND * i
    )
}

// 5. Press Enter and watch the videos disappear
