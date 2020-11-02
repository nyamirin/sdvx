var tool = -1;
var chart = [];         //chart[num마디 번호][loc노트 종류][time타이밍]=0 or 1
var split_chart = [];   //chart + [분수]
var efchart = [];
var split_efchart = [];

function ctb() {
}

function make_chart() {
    for (let num = 0; num < lnum; num++) {
        chart[num] = new Array();
        efchart[num] = new Array();
        split_chart[num] = new Array();
        split_efchart[num] = new Array();
        for (let loc = 0; loc < 6; loc++) {
            chart[num][loc] = new Array();
            split_chart[num][loc] = new Array();
            for (let sp = 0; sp < beat; sp++) {
                split_chart[num][loc][sp] = new Array();
            }
        }
        for (let loc = 0; loc < 2; loc++) {
            efchart[num][loc] = new Array();
            split_efchart[num][loc] = new Array();
            for (let sp = 0; sp < beat; sp++) {
                split_efchart[num][loc][sp] = new Array();
            }
        }
    }
}

function click_ntb(tb, pass) {
    if (tb.querySelector('.innertable') && !pass && tool != 7) return;
    let id = tb.id;
    let index = id.indexOf('-');
    let num = id.slice(0, index);
    let loc = id[index + 1];
    let time = id.slice(index + 2);
    if (tool == 7) {
        let ed = tb.querySelector(".innertable");
        if (ed) ed.parentNode.removeChild(ed);
        else {
            let sp = $$('splitinput').value;
            let h = tb.offsetHeight;
            if (sp == 1) { alert('2 이상으로 분할 가능'); }
            else {
                let txt = `<table class="innertable" name="` + sp + `"><tbody>`;
                for (let i = 0; i < sp; i++) {
                    txt += `<tr><td name="` + i + `" class="innertd" onclick="click_split(this,` + i + `,` + sp + `);" onmouseover="sp_over(this);" onmouseout="sp_out(this);"></td></tr>`;
                }
                txt += `</tbody></table>`;
                tb.insertAdjacentHTML('beforeend', txt);
                ed = tb.querySelector(".innertable");
                ed.style.height = h;
            }
        }
    }
    else if (tool == 0) {
        if (chart[num][loc][time] == 1) return;
        if (chart[num][loc][time] == 2) {
            tool = 6;
            delete_note(tb.querySelector('.noteclass'));
            tool = 0;
        }
        chart[num][loc][time] = 1;
        let txt = "<img class='noteclass' id='n" + num + "-" + loc + time + "' src='img/note/0.png' onclick='delete_note(this);'>"
        tb.insertAdjacentHTML('beforeend', txt);
    }
    else if (tool == 1) {
        if (chart[num][loc][time] == 2) return;
        if (chart[num][loc][time] == 1) {
            tool = 6;
            delete_note(tb.querySelector('.noteclass'));
            tool = 1;
        }
        chart[num][loc][time] = 2;
        let txt = "<img class='noteclass' id='l" + num + "-" + loc + time + "' src='img/note/1.png' onclick='delete_note(this);'>"
        tb.insertAdjacentHTML('beforeend', txt);
    }
    else if (tool == 2) {
        let tb2 = $('#' + tb.getAttribute('id'));
        let txt = "<img class='efclass' id='e" + num + "-" + loc + time + "' src='img/note/2.png' onclick='delete_note(this);'>";
        tb.insertAdjacentHTML('beforeend', txt);
        if (loc == 1 || loc == 3) tb2.next().append(txt);
        else tb2.prev().append(txt);

    }
    else if (tool == 6) {
        delete_note(tb);
    }
}

function click_split(tb, i, n) {
    let outter = tb.parentNode.parentNode.parentNode.parentNode;
    let id = outter.getAttribute('id');
    let index = id.indexOf('-');
    let num = id.slice(0, index);
    let loc = id[index + 1];
    let time = id.slice(index + 2);
    if (tool == 0) {
        if (i + 1 == n) {
            click_ntb(outter, 1);
            return;
        }
        if (split_chart[num][loc][time][i] == 1) return;
        if (split_chart[num][loc][time][i] == 2) {
            tool = 6;
            delete_note(tb.querySelector('.snoteclass'));
            tool = 0;
        }
        split_chart[num][loc][time][i] = 1;
        let txt = "<img class='snoteclass' id='n" + num + "-" + loc + time + "' src='img/note/0.png' onclick='delete_note(this);'>"
        tb.insertAdjacentHTML('beforeend', txt);
    }
    else if (tool == 1) {
        if (split_chart[num][loc][time][i] == 2) return;
        if (split_chart[num][loc][time][i] == 1) {
            tool = 6;
            delete_note(tb.querySelector('.snoteclass'));
            tool = 1;
        }
        split_chart[num][loc][time][i] = 2;
        let txt = "<img class='snoteclass' id='l" + num + "-" + loc + time + "' src='img/note/1.png' onclick='delete_note(this);'>"
        tb.insertAdjacentHTML('beforeend', txt);
    }
    else if (tool == 2) {
        let td = tb.parentNode.parentNode.parentNode.parentNode;
        let tb2 = $('#' + td.getAttribute('id'));
        let txt = "<img class='sefclass' id='e" + num + "-" + loc + time + "' src='img/note/2.png' onclick='delete_note(this);'>";
        tb.insertAdjacentHTML('beforeend', txt);
        let tds;
        if (loc == 1 || loc == 3) tds = tb2.next();
        else tds = tb2.prev();
        tds = $$(tds.attr('id'));

        let h = tds.offsetHeight;
        let ed = tds.querySelector(".innertable");
        if (ed) {
            if (ed.getAttribute('name') == n) {
                let li = tds.querySelectorAll(".innertd");
                li[i].insertAdjacentHTML('beforeend', txt);
            }
            else {
                alert('분할 수가 맞지 않습니다.');
            }
        }
        else {
            let txt2 = `<table class="innertable"><tbody>`;
            for (let i = 0; i < n; i++) {
                txt2 += `<tr><td name="` + i + `" class="innertd" onclick="click_split(this,` + i + `,` + n + `);" onmouseover="sp_over(this);" onmouseout="sp_out(this);"></td></tr>`;
            }
            txt2 += `</tbody></table>`;
            tds.insertAdjacentHTML('beforeend', txt2);
            ed = tds.querySelector(".innertable");
            ed.style.height = h;
            let li = tds.querySelectorAll(".innertd");
            li[i].insertAdjacentHTML('beforeend', txt);
        }
    }

}

function click_tool(t) {
    $('#tool' + tool).css("border", "solid 1px black");
    $('#tool' + t).css("border", "solid 1px white");
    tool = t;
}

function delete_note(img) {
    if (tool != 6) return;
    let cls = img.getAttribute('class');
    if (cls == 'noteclass') {
        let id = img.getAttribute('id');
        let index = id.indexOf('-');
        let num = id.slice(1, index);
        let loc = id[index + 1];
        let time = id.slice(index + 2);
        chart[num][loc][time] = 0;
        img.parentNode.removeChild(img);
    }
    else if (cls == 'snoteclass') {
        let id = img.getAttribute('id');
        let index = id.indexOf('-');
        let num = id.slice(1, index);
        let loc = id[index + 1];
        let time = id.slice(index + 2);
        let i = img.getAttribute('name');
        split_chart[num][loc][time][i] = 0;
        img.parentNode.removeChild(img);
    }
}

function mouse_over(tb) {
    if (tb.querySelector('.innertable')) return;
    if (tool == 0) {
        let txt = "<img class='overclass' src='img/note/0.png'>"
        tb.insertAdjacentHTML('beforeend', txt);
    }
    else if (tool == 1) {
        let txt = "<img class='overclass' src='img/note/1.png' onmouseover='mouse_out(this);'>"
        tb.insertAdjacentHTML('beforeend', txt);
    }
}

function mouse_out(tb) {
    if (tool == 1 && tb.getAttribute('class') == 'tg-dsic') return;
    //if (tb.querySelector('.innertable')) return;
    let over = document.querySelectorAll(".overclass");
    for (let i = 0; i < over.length; i++)
        over[i].parentNode.removeChild(over[i]);
}

function sp_over(tb) {
    if (tool == 0) {
        let txt = "<img class='overclass' src='img/note/0.png'>"
        tb.insertAdjacentHTML('beforeend', txt);
    }
    else if (tool == 1) {
        let txt = "<img class='overclass' src='img/note/1.png' onmoseout='mouse_out(this);'>"
        tb.insertAdjacentHTML('beforeend', txt);
    }
}

function sp_out(tb) {
    let over = document.querySelector(".overclass");
    if (over) over.parentNode.removeChild(over);
    /*for (let i = 0; i < over.length; i++) {
        if (over[i]) over[i].parentNode.removeChild(over[i]);
    }*/
}

function check_tb(tb) {
    let id = tb.id;
    let index = id.indexOf('-');
    let num = id.slice(0, index);
    let loc = id[index + 1];
    let time = id[index + 2];
    return chart[num][loc][time];
}

function check_stb(tb) {
    let outter = tb.parentNode.parentNode.parentNode.parentNode;
    let id = outter.getAttribute('id');
    let index = id.indexOf('-');
    let num = id.slice(0, index);
    let loc = id[index + 1];
    let time = id.slice(index + 2);
    let sp = tb.getAttribute('name');
    return split_chart[num][loc][time][sp];
}
