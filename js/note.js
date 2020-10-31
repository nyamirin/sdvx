var tool = -1;
var chart = [];    //chart[num마디 번호][not노트 종류][time타이밍]=0 or 1
var split_chart = [];
var split = 0;

function ctb() {
    log('tb');
}

function make_chart() {
    for (let num = 0; num < lnum; num++) {
        chart[num] = new Array();
        split_chart[num] = new Array();
        for (let not = 0; not < 6; not++) {
            chart[num][not] = new Array();
            split_chart[num][not] = new Array();
        }

    }
}

function click_ntb(tb) {
    let id = tb.id;
    let index = id.indexOf('-');
    let num = id.slice(0, index);
    let not = id[index + 1];
    let time = id.slice(index + 2);

    if (tool == 7) {
        let h = tb.offsetHeight - 4;
        let ed = tb.querySelector(".innertable");
        if (ed) ed.parentNode.removeChild(ed);
        else {
            let sp = $$('splitinput').value;
            if (sp == 1) { alert('2 이상으로 분할 가능'); }
            else {
                let txt = `<table class="innertable"><tbody>`;
                for (let i = 0; i < sp - 1; i++) {
                    txt += `<tr><td class="innertd"></td></tr>`;
                }
                txt += `<tr><td class="innertd"></td></tr></tbody></table>`;
                tb.insertAdjacentHTML('beforeend', txt);
                ed = tb.querySelector(".innertable");
                ed.style.height = h;
            }
        }
    }
    else {
        if (chart[num][not][time] == tool) log('ex');
        else {
            chart[num][not][time] = tool;
        }
        if (tool == 0) {
            let txt = "<img class='noteclass' id='0note' src='img/note/0.png'>"
            tb.insertAdjacentHTML('beforeend', txt);
        }
        else if (tool == 1) {
            tb.style.backgroundColor = 'white';
            tb.style.boxShadow = '3px 0 black inset,-3px 0 black inset';
        }
    }
}


function click_tool(t) {
    $('#tool' + tool).css("border", "solid 1px black");
    $('#tool' + t).css("border", "solid 1px white");
    tool = t;
}

function delete_note() {

}

function mouse_over(tb) {
    check_tb(tb);
    if (tool == 0) {
        let txt = "<img class='overclass' src='img/note/0.png'>"
        tb.insertAdjacentHTML('beforeend', txt)
    }
    else if (tool == 1) {
        if (check_tb(tb) != 1)
            tb.style.backgroundColor = 'gray';
        tb.style.boxShadow = '3px 0 black inset,-3px 0 black inset';
        let txt = "<span class='overclass'></span>"
        tb.insertAdjacentHTML('beforeend', txt)
    }
}

function mouse_out(tb) {
    let over = document.querySelector(".overclass");
    if (over) over.parentNode.removeChild(over);
    if (tool == 1) {
        if (check_tb(tb) != 1) {
            tb.style.backgroundColor = 'black';
            tb.style.boxShadow = 'none';
        }
        else tb.style.backgroundColor = 'white';
    }
}

function check_tb(tb) {
    let id = tb.id;
    let index = id.indexOf('-');
    let num = id.slice(0, index);
    let not = id[index + 1];
    let time = id[index + 2];

    return chart[num][not][time];
}