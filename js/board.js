function Board(d) {
    this.div = d;
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
          <td class="tg-9f6f"></td>
          <td class="tg-dsic"></td>
          <td class="tg-dsic"></td>
          <td class="tg-dsic"></td>
          <td class="tg-dsic"></td>
          <td class="tg-ipzd"></td>
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
    obj.disp();
}

function make_boards() {
    let txt = '';
    for (let i = 0; i < parseInt((lnum + 1) / 2); i++)
        txt += `<span class="dispan">
                    <span class="innerspan">
                        <div class="innerdiv1">`+ (i * 2 + 1) + `</div>
                        <div class="innerdiv2">`+ (i * 2) + `</div>
                    </span>
                    <span class="innerspan">
                        <div class="innerdiv" id="udis` + i + `"></div>
                        <div class="innerdiv" id="ddis` + i + `"></div>
                    </span>
                </span>`;
    $$("dispdiv").innerHTML = txt;
}