function $$(v) {
    return document.getElementById(v);
}

function log(txt) {
    $$('ts').innerText = txt;
}

function sleep(milliSeconds) {
    var startTime = new Date().getTime();                    // get the current time
    while (new Date().getTime() < startTime + milliSeconds); // hog cpu until time's up
}