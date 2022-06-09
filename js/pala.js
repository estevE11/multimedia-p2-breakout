class Pala {
    constructor(puntPosicio, amplada, alcada, joc, canvas){      
        this.amplada = amplada;
        this.alcada = alcada;
        this.posicio = puntPosicio;
        this.vy = 2;     
        this.vx = 2;               
        this.color = "#fbb"; 
        this.canvas = canvas;
        this.shoot = false;
        this.joc = joc;
    }


    update(){
        if (!this.shoot) {
            if (joc.key.RIGHT.pressed) {
                this.posicio.x = Math.min(joc.amplada - this.amplada,
                    this.posicio.x + this.vx)
            } else
                if (joc.key.LEFT.pressed) {
                    this.posicio.x = Math.max(0, this.posicio.x - this.vx);
                }
        } else { 
            if (joc.key.SPACE.pressed) {
                this.joc.dispararBola(1, -1);
            }                 
        }
    }

      
    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.posicio.x, this.posicio.y, this.amplada, this.alcada);
        ctx.restore();

    }
    mou(x, y) {
        this.posicio.x += x;
        this.posicio.y += y;
    }

    resetPosicio() {
        this.shoot = true;
        this.posicio.x = (this.canvas.width - 60) / 2;
        this.posicio.y = this.canvas.height - 15;
    }
}