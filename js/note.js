var tool = 0;

function ctb() {
}

function click_ntb(tb) {
    if (tool == 0) {
        let txt = "<img class='noteclass' id='0note' src='img/note/0.png'>"
        tb.innerHTML += txt;
    }
    else if (tool == 1) {
        tb.style.backgroundColor = 'white';
        tb.style.boxShadow = '3px 0 black inset,-3px 0 black inset';
    }
}

function click_tool(t) {
    $('#tool' + tool).css("border", "solid 1px black");
    $('#tool' + t).css("border", "solid 1px white");
    tool = t;
}