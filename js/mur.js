class Mur {
    constructor(canvasW, canvasH) {
        this.canvasW = canvasW;
        this.canvasH = canvasH;

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
        let padding = 5;

        let color = this.nivells[n].color;
        let totxos = this.nivells[n].totxos;
        let cols = totxos[0].length;
        let rows = totxos.length;
        let tW = this.canvasW / cols;
        let tH = 20;

        for (let y = 0; y < rows; y++) { 
            for (let x = 0; x < cols; x++) {
                if (totxos[y].charAt(x) == "a") {
                    this.totxos.push(new Totxo(new Punt(x*tW + padding, y*tH + padding), tW-padding*2, tH-padding*2, color));
                }
            }
        }
    }

    draw(ctx) { 
        for (let i = 0; i < this.totxos.length; i++) { 
            this.totxos[i].draw(ctx);
        }
    }
}