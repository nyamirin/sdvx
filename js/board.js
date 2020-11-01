function Board(i) {
    this.th = i + 1;
    this.div = (i % 2 ? 'u' : 'd') + 'dis' + parseInt(i / 2);
    this.efdiv = 'ef' + (i % 2 ? 'u' : 'd') + 'dis' + parseInt(i / 2);
    this.txt = '';
    this.disp = display;
}

function display() {
    this.txt = '<table class="tg"><tbody>';
    for (let i = 0; i < beat; i++) {
        this.txt += `
        <tr>
          <td class="tg-9f6f" id="`+ this.th + `-0` + (beat - i - 1) + `"></td>
          <td class="tg-dsic" id="`+ this.th + `-1` + (beat - i - 1) + `" onclick="click_ntb(this);" onmouseover="mouse_over(this);" onmouseout="mouse_out(this);"></td>
          <td class="tg-dsic" id="`+ this.th + `-2` + (beat - i - 1) + `" onclick="click_ntb(this);" onmouseover="mouse_over(this);" onmouseout="mouse_out(this);"></td>
          <td class="tg-dsic" id="`+ this.th + `-3` + (beat - i - 1) + `" onclick="click_ntb(this);" onmouseover="mouse_over(this);" onmouseout="mouse_out(this);"></td>
          <td class="tg-dsic" id="`+ this.th + `-4` + (beat - i - 1) + `" onclick="click_ntb(this);" onmouseover="mouse_over(this);" onmouseout="mouse_out(this);"></td>
          <td class="tg-ipzd" id="`+ this.th + `-5` + (beat - i - 1) + `"></td>
        </tr>`;
    }
    this.txt += '</tbody> </table>';
    $$(this.div).innerHTML = this.txt;
}

function submit() {
    if (confirm('값을 변경하면 진행상황이 사라집니다.')) {
        beat = $$("beatinput").value;
        lnum = $$("lnuminput").value;
        make_boards();
        scroll_board();
        document.documentElement.style.setProperty('--per', 100 / beat);
    }
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
