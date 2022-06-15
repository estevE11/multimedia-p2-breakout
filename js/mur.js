class Mur {
    constructor(canvasW, canvasH, joc) {
        this.canvasW = canvasW;
        this.canvasH = canvasH;

        this.joc = joc;

        this.currentLevel = 0;

        this.totxos = [];
        this.nivells = [];
        this.defineixNivells();
    }

    defineixNivells() {
        this.nivells = [
            {
                color: "#4CF",
                totxos: [
                    "aaaaa",
                    "aaaaa",
                    "aaaaa",
                    "aaaaa",
                ]
            },
            {
                color: "#8D1",
                totxos: [
                    "  a  ",
                    " aaa ",
                    "aaaaa",
                    " aaa ",
                ]
            },
            {
                color: "#D30",
                totxos: [
                    "a   a",
                    " a a ",
                    "aa aa",
                    "  a  ",
                ]
            }
        ];
    }

    changeLevel(n) { 
        this.currentLevel = n;
        let padding = 5;

        let color = this.nivells[n].color;
        let totxos = this.nivells[n].totxos;
        let cols = totxos[0].length;
        let rows = totxos.length;
        let tW = this.canvasW / cols;
        let tH = 25;

        for (let y = 0; y < rows; y++) { 
            for (let x = 0; x < cols; x++) {
                if (totxos[y].charAt(x) == "a") {
                    this.totxos.push(new Totxo(new Punt(x*tW + padding, y*tH + padding), tW-padding*2, tH-padding*2, color));
                }
            }
        }
    }

    nextLevel() { 
        console.log(parseInt(this.currentLevel) + 1, this.nivells.length);
        if (parseInt(this.currentLevel) + 1 == this.nivells.length) { 
            localStorage['hiscore'] = this.joc.score;
            return;
        }
        this.currentLevel++;
        this.changeLevel(this.currentLevel);
    }

    draw(ctx) { 
        for (let i = 0; i < this.totxos.length; i++) { 
            this.totxos[i].draw(ctx);
        }
    }

    eliminarTotxo(totxo) { 
        this.totxos = this.totxos.filter(function (it) {
            return it != totxo;
        });
        playSound('brick');
    }
}