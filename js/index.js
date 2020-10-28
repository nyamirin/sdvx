var ao;
var interval;
var duration;
var sec;
var beat = 8;
var lnum = 20;
var objlist = [];
var rate = 0;
var board_width;

function Init() {
    make_boards();

    $('input[type=range]').on('input', function () {
        let val = $(this).val();
        rate = val;
        input_time(val);
        $(this).css('background', 'linear-gradient(to right, dodgerblue 0%, dodgerblue ' + val + '%, #d5d4d3 ' + val + '%, #d5d4d3 100%)');
    });
    $('input[type=range]').on('change', function () {
        ao.currentTime = duration * $(this).val() / 100;
        nowtime();
    });
    $$("upload").addEventListener("change", handleFiles, false);
}

function handleFiles(event) {
    let files = event.target.files;
    $("#src").attr("src", URL.createObjectURL(files[0]));
    $$("audio").load();
    $$("filename").innerText = files[0].name;
    setTimeout(readtime, 100);
}

function readtime() {
    ao = $$("audio");
    duration = parseInt(ao.duration);
    let min = parseInt(duration / 60);
    let lsec = duration % 60;
    $$("duration").innerText = (min + ':' + lsec);
    $$("curtime").innerText = ("0:00");
}

function nowtime() {
    sec = parseInt(ao.currentTime);
    let nmin = parseInt(sec / 60);
    let nlsec = sec % 60;
    rate = parseInt((sec / duration) * 100);
    let txt;
    if (nlsec < 10) txt = ':0';
    else txt = ':';
    $$("curtime").innerText = (nmin + txt + nlsec);
    $$("range").value = rate;
    $('input[type=range]').css('background', 'linear-gradient(to right, dodgerblue 0%, dodgerblue ' + rate + '%, #d5d4d3 ' + rate + '%, #d5d4d3 100%)');
    scroll_board();
}

function input_time(val) {
    sec = parseInt(duration / 100 * val);
    let nmin = parseInt(sec / 60);
    let nlsec = sec % 60;
    rate = parseInt((sec / duration) * 100);
    let txt;
    if (nlsec < 10) txt = ':0';
    else txt = ':';
    $$("curtime").innerText = (nmin + txt + nlsec);
    $('input[type=range]').css('background', 'linear-gradient(to right, dodgerblue 0%, dodgerblue ' + rate + '%, #d5d4d3 ' + rate + '%, #d5d4d3 100%)');
    scroll_board();
}

function click_play() {

    if (ao.paused) {
        ao.play();
        interval = setInterval(nowtime, 1000);
    }
    else {
        ao.pause();
        clearInterval(interval);
    }
}

function scroll_board() {
    let tls = rate * -1 * board_width / 100;
    $$('innerdisp').style.transform = 'translateX(' + tls + 'px)';
}

