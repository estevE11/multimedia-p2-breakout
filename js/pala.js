class Pala {
    constructor(puntPosicio, amplada, alcada, joc, canvas){      
        this.amplada = amplada;
        this.alcada = alcada;
        this.posicio = puntPosicio;
        this.vy = 2;     
        this.vx = 3.5;             
        this.color = "#fbb"; 
        this.canvas = canvas;
        this.shoot = true;
        this.joc = joc;
        this.shootA = -Math.PI / 2;
        this.responsive = true;
    }


    update() {
        if (!this.responsive) return;
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
                this.joc.dispararBola(Math.cos(this.shootA) * 2, Math.sin(this.shootA) * 2);
            }                 
            if (joc.key.RIGHT.pressed) {
                this.shootA += 0.05;
            } else
                if (joc.key.LEFT.pressed) {
                    this.shootA -= 0.05;
                }
            if (this.shootA < -Math.PI / 2 - Math.PI / 4) this.shootA = -Math.PI / 2 - Math.PI / 4;
            if (this.shootA > 0 - Math.PI / 4) this.shootA = 0 - Math.PI / 4;
        }
    }

      
    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.posicio.x, this.posicio.y, this.amplada, this.alcada);
        ctx.restore();

        // Dibuixar linia per apuntar
        if (this.shoot) {            
            ctx.beginPath();
            ctx.moveTo(this.posicio.x + this.amplada/2, this.posicio.y - 4);
            ctx.lineTo((this.posicio.x + this.amplada / 2) + Math.cos(this.shootA)*20, (this.posicio.y - 2) + Math.sin(this.shootA)*20);
            ctx.stroke();
        }
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