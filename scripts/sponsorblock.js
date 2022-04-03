// ==UserScript==
// @name         Sponsorblock
// @version      1.0.0
// @description  Skip sponsor segments automatically
// @author       afreakk & Andronedev
// @match        *://*.youtube.com/*
// @exclude      *://*.youtube.com/subscribe_embed?*
// ==/UserScript==


const tryFetchSkipSegments = async (videoID) => {
    try {
        // use xhr to bypass CORS

        xhr = new XMLHttpRequest();
        xhr.open('GET', `https://sponsor.ajay.app/api/skipSegments?videoID=${videoID}`, false);
        xhr.send();
        if (xhr.status === 200) {
            return JSON.parse(xhr.responseText).filter((a) => a.actionType === 'skip')
            .map((a) => a.segment);
        }
    } catch (e) {
        console.log(e);
    }
    return [];
};


const skipSegments = async () => {
    const videoID = new URL(document.location).searchParams.get('v');
    if (!videoID) {
        return;
    }
    const v = document.querySelector('video');
    if (!v) {
        return console.log("Sponsorblock: couldn't find video element");
    }
    const key = `segmentsToSkip-${videoID}`;
    window[key] = window[key] || (await tryFetchSkipSegments(videoID));
    for (const [start, end] of window[key]) {
        if (v.currentTime < end && v.currentTime > start) {
            v.currentTime = end;
            return console.log(`Sponsorblock: skipped video to ${end}`);
        }
    }
};
if (!window.skipSegmentsIntervalID) {
    window.skipSegmentsIntervalID = setInterval(skipSegments, 1000);
}