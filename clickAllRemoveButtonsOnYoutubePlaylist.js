// This script will click all the remove buttons on your YouTube playlist
// at a rate of 5/second, provided that the whole playlist is loaded in the
// browser. If it spans multiple pages, you'll need to run this multiple times.
// (Sorry, I've never had a playlist that long.)
//
// 1. Open your playlist in Chrome or Firefox
// 2. Open the browser's JavaScript console
//  - Chrome: cmd-option-J (Mac) / ctrl-shift-J (Windows)
//  - Firefox: cmd-shift-J (Mac) / ctrl-shift-J (Windows)
// 3. Paste this whole thing in, press Enter and follow the instructions
//
// Works as of 2020-03-01
//
// If you're having any issues with this script, please let me know
// (or fork it, fix it yourself and submit a PR)


// OPTIONS

var CLICKS_PER_SECOND = 5; // Experiment with faster speeds if you want to
var KEEP_THE_LAST = 0; // Set this number to keep the last N videos


// OTHER GLOBALS

var RERUN_INSTRUCTIONS = "run this script again by clicking on the console, " +
                         "pressing the Up arrow, then Enter."
var buttonsClicked = 0;


// DEFINITIONS

var onNewPage = () => {
    let queryString = window.location.search;
    return !queryString.includes("disable_polymer=true")
         || queryString.includes("disable_polymer=false")
    }

var redirectToOldPage = () => {
    alertRedirect();
    logRedirect();
    window.location.search += "&disable_polymer=true";
}

var getToWork = () => {
    if (fullyLoaded())
        doGetToWork();
    else
        scheduleWork();
}

var doGetToWork = () => {    
    var removeButtons = selectRemoveButtons();
    var nVideosToRemove = removeButtons.length - KEEP_THE_LAST;

    if (didConfirm(nVideosToRemove)) {
        logRemoval(nVideosToRemove);
        scheduleClicks(removeButtons, nVideosToRemove);
        scheduleSuccessNotifications();
    } else {
        logCancellation();
    }
}

var scheduleWork = () => {
    window.addEventListener('load', doGetToWork);
}

var fullyLoaded = () => {
    return (document.readyState === "complete");
}

var selectRemoveButtons = () => {
    return document.querySelectorAll(".pl-video-edit-remove");
}

var didConfirm = (nVideosToRemove) => {
    answer = promptRemovalConfirmation(nVideosToRemove);
    return (answer && answer.trim() === "YES");
}

var scheduleClicks = (buttons, stop) => {
    let msPerClick = 1000 / CLICKS_PER_SECOND;
    for (let i = 0; i < stop; i++) {
        scheduleClick(buttons, i, msPerClick);
    }
}

var scheduleClick = (buttons, i, msPerClick) => {
    setTimeout(
        () => clickAndIncrement(buttons, i),
        msPerClick * i
    );
}

var clickAndIncrement = (buttons, i) => {
    buttons[i].click();
    buttonsClicked++;
}

var scheduleSuccessNotifications = () => {
    setTimeout(notifySuccessIfDone, 500);
}

var notifySuccessIfDone = () => {
    if (isRemovalDone()) {
        alertSuccess();
        logSuccess();
    } else {
        setTimeout(notifySuccessIfDone, 500);
    }
}

var isRemovalDone = () => {
    return (selectRemoveButtons().length === KEEP_THE_LAST);
}

var alertRedirect = () => {
    alert(
        "You'll be redirected to an older version of this page that has " +
        "remove buttons. When you arrive, " +
        RERUN_INSTRUCTIONS
    );
}

var alertSuccess = () => {
    alert(
        `We've clicked ${buttonsClicked} remove buttons for you. ` +
        `If unwanted videos still remain, ` +
        RERUN_INSTRUCTIONS
    );
}

var promptRemovalConfirmation = (nVideosToRemove) => {
    let totalDuration = nVideosToRemove / CLICKS_PER_SECOND;
    return prompt(
        `We're about to remove ${nVideosToRemove} videos from your playlist, ` +
        `which should take about ${totalDuration} seconds. ` +
        `This can not be undone. ` +
        `Type "YES" to proceed, or "Oh my God, please no!" to cancel.`
    );
}

var logRedirect = () => {
    console.log("Redirecting...");
}

var logRemoval = (nVideosToRemove) => {
    console.log(`Removing ${nVideosToRemove} videos...`);
}

var logCancellation = () => {
    console.log("No videos were removed.");
}

var logSuccess = () => {
    console.log("Done.");
}


// RUN

if (onNewPage()) {
    redirectToOldPage();
} else {
    getToWork();
}
