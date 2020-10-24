function Init() {
    $('input[type=range]').on('input', function () {
        var val = $(this).val();
        $(this).css('background', 'linear-gradient(to right, dodgerblue 0%, dodgerblue ' + val + '%, #d5d4d3 ' + val + '%, #d5d4d3 100%)');
    });

    $$("upload").addEventListener("change", handleFiles, false);
}

function handleFiles(event) {
    var files = event.target.files;
    $("#src").attr("src", URL.createObjectURL(files[0]));
    $$("audio").load();
    $$("filename").innerText = files[0].name;
}

function click_play() {
    var ao = $$("audio");
    if (ao.paused) ao.play();
    else ao.pause();
}