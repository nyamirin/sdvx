var ao;
var interval;
var duration;
var sec;
var beat = 8;
var lnum = 10;
var objlist = [];

function Init() {
    make_boards();

    for (let i = 0; i < lnum; i++) {
        objlist[i] = new Board((i % 2 ? 'u' : 'd') + 'dis' + parseInt(i / 2))
        objlist[i].disp();
    }
    /*
    obj = new Board('udis0');
    obj.disp();
    obj2 = new Board('ddis0');
    obj2.disp();

    obj3 = new Board('udis1');
    obj3.disp();
    obj4 = new Board('ddis1');
    obj4.disp();*/

    $('input[type=range]').on('input', function () {
        let val = $(this).val();
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
    let rate = parseInt((sec / duration) * 100);
    let txt;
    if (nlsec < 10) txt = ':0';
    else txt = ':';
    $$("curtime").innerText = (nmin + txt + nlsec);
    $$("range").value = rate;
    log(rate);
    $('input[type=range]').css('background', 'linear-gradient(to right, dodgerblue 0%, dodgerblue ' + rate + '%, #d5d4d3 ' + rate + '%, #d5d4d3 100%)');
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