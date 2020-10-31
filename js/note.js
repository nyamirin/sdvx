var tool = -1;
var chart = [];         //chart[num마디 번호][not노트 종류][time타이밍]=0 or 1
var split_chart = [];   //chart + [분수]
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
            for (let sp = 0; sp < beat; sp++) {
                split_chart[num][not][sp] = new Array();
            }
        }

    }
}

function click_ntb(tb, pass) {
    if (tb.querySelector('.innertable') && !pass && tool != 7) return;
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
                for (let i = 0; i < sp; i++) {
                    txt += `<tr><td name="` + i + `" class="innertd" onclick="click_split(this,` + i + `,` + sp + `,0);" onmouseover="sp_over(this);" onmouseout="sp_out(this);"></td></tr>`;
                }
                txt += `</tbody></table>`;
                tb.insertAdjacentHTML('beforeend', txt);
                ed = tb.querySelector(".innertable");
                ed.style.height = h;
            }
        }
    }
    else if (tool == 0) {
        if (chart[num][not][time] == 1) return;
        chart[num][not][time] = 1;
        let txt = "<img class='noteclass' id='0note' src='img/note/0.png'>"
        tb.insertAdjacentHTML('beforeend', txt);
    }
    else if (tool == 1) {
        if (chart[num][not][time] == 2) return;
        chart[num][not][time] = 2;
        tb.style.backgroundColor = 'white';
        tb.style.boxShadow = '3px 0 black inset,-3px 0 black inset';
    }
}

function click_split(tb, i, n, last) {
    let outter = tb.parentNode.parentNode.parentNode.parentNode;
    let id = outter.getAttribute('id');
    let index = id.indexOf('-');
    let num = id.slice(0, index);
    let not = id[index + 1];
    let time = id.slice(index + 2);
    if (tool == 0) {
        if (i + 1 == n) {
            click_ntb(outter, 1);
            return;
        }
        if (split_chart[num][not][time][i] == 1);
        else {
            split_chart[num][not][time][i] = 1;
        }
        let txt = "<img class='noteclass' id='0note' src='img/note/0.png'>"
        tb.insertAdjacentHTML('beforeend', txt);
    }
    else if (tool == 1) {
        split_chart[num][not][time][i] = 2;
        tb.style.backgroundColor = 'white';
        tb.style.boxShadow = '2px 0 black inset,-2px 0 black inset,0 -1px white';

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
    if (tb.querySelector('.innertable')) return;
    check_tb(tb);
    if (tool == 0) {
        let txt = "<img class='overclass' src='img/note/0.png'>"
        tb.insertAdjacentHTML('beforeend', txt)
    }
    else if (tool == 1) {
        if (check_tb(tb) != 2)
            tb.style.backgroundColor = 'gray';
        tb.style.boxShadow = '3px 0 black inset,-3px 0 black inset,0 1px white inset';
        let txt = "<span class='overclass'></span>"
        tb.insertAdjacentHTML('beforeend', txt)
    }
}

function mouse_out(tb) {
    if (tb.querySelector('.innertable')) return;
    let over = document.querySelector(".overclass");
    if (over) over.parentNode.removeChild(over);
    if (tool == 1) {
        if (check_tb(tb) != 2) {
            tb.style.backgroundColor = 'black';
            tb.style.boxShadow = 'none';
        }
        else tb.style.backgroundColor = 'white';
    }
}

function sp_over(tb) {
    if (tool == 0) {
        let txt = "<img class='overclass' src='img/note/0.png'>"
        tb.insertAdjacentHTML('beforeend', txt)
    }
    else if (tool == 1) {
        if (check_stb(tb) != 2)
            tb.style.backgroundColor = 'gray';
        tb.style.boxShadow = '2px 0 black inset,-2px 0 black inset';
        let txt = "<span class='overclass'></span>"
        tb.insertAdjacentHTML('beforeend', txt)
    }
}

function sp_out(tb) {
    let over = document.querySelectorAll(".overclass");
    for (let i = 0; i < over.length; i++) {
        if (over[i]) over[i].parentNode.removeChild(over[i]);
    }
    if (tool == 1) {
        if (check_stb(tb) != 2) {
            tb.style.backgroundColor = 'black';
            tb.style.boxShadow = '0 1px white inset';
            tb.parentNode.parentNode.querySelector('td').style.boxShadow = 'none';
        }
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

function check_stb(tb) {
    let outter = tb.parentNode.parentNode.parentNode.parentNode;
    let id = outter.getAttribute('id');
    let index = id.indexOf('-');
    let num = id.slice(0, index);
    let not = id[index + 1];
    let time = id.slice(index + 2);
    let sp = tb.getAttribute('name');
    return split_chart[num][not][time][sp];
}
