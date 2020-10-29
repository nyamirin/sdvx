function Board(i) {
    this.th = i + 1;
    this.div = (i % 2 ? 'u' : 'd') + 'dis' + parseInt(i / 2);
    this.txt = '';
    this.disp = display;
}

function display() {
    this.txt = `
    <table class="tg">
    <tbody>`;
    for (let i = 0; i < beat; i++) {
        this.txt += `
        <tr>
          <td class="tg-9f6f" id="`+ this.th + `-l` + i + `"></td>
          <td class="tg-dsic" id="`+ this.th + `-a` + i + `" onclick="click_ntb(this);"></td>
          <td class="tg-dsic" id="`+ this.th + `-b` + i + `" onclick="click_ntb(this);"></td>
          <td class="tg-dsic" id="`+ this.th + `-c` + i + `" onclick="click_ntb(this);"></td>
          <td class="tg-dsic" id="`+ this.th + `-d` + i + `" onclick="click_ntb(this);"></td>
          <td class="tg-ipzd" id="`+ this.th + `-r` + i + `"></td>
        </tr>`;
    }
    this.txt += `
    </tbody>
    </table>`;

    $$(this.div).innerHTML = this.txt;
}

function submit() {
    beat = $$("beatinput").value;
    lnum = $$("lnuminput").value;
    make_boards();
    scroll_board();
}

function make_boards() {
    let txt = '';
    $$("innerdisp").innerHTML = txt;
    for (let i = 0; i < parseInt((parseInt(lnum) + 1) / 2); i++) {
        txt += `<span class="dispan">
                    <span class="innerspan">
                        <div class="innerdiv1">`+ (i * 2 + 1) + `</div>
                        <div class="innerdiv2">`+ (i * 2 + 2) + `</div>
                    </span>
                    <span class="innerspan">
                        <div class="innerdiv" id="udis` + i + `"></div>
                        <div class="innerdiv" id="ddis` + i + `"></div>
                    </span>
                </span>`;
    }
    $$("innerdisp").innerHTML = txt;

    for (let i = 0; i < lnum; i++) {
        objlist[i] = new Board(i);
        objlist[i].disp();
    }

    let wd = $("#innerdisp").outerWidth(true);
    board_width = wd - 500;
}