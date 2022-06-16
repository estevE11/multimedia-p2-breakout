class Bola {
    constructor(puntPosicio, radi, pala, joc) {
        this.radi = radi;
        this.posicio = puntPosicio;
        this.vx = 0;
        this.vy = 0;
        this.color = "#0095DD";
        this.pala = pala;
        this.joc = joc;
        this.resetPosicio();
    };

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.posicio.x, this.posicio.y, this.radi, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }
    mou(x, y) {
        this.posicio.x += x;
        this.posicio.y += y;
    }

    setVelocitat(x, y) { 
        this.vx = x;
        this.vy = y;
    }

    update() {

        let puntActual = this.posicio;
        let puntSeguent = new Punt(this.posicio.x + this.vx,
            this.posicio.y + this.vy);
        let trajectoria = new Segment(puntActual, puntSeguent);
        let exces;
        let xoc = false;

        //Xoc amb les cantonades del canvas
        if (trajectoria.puntB.y - this.radi > joc.alcada) {
            this.vx = 0;
            this.vy = 0;
            this.pala.resetPosicio();
            this.resetPosicio();
            this.joc.vides--;
            playSound('life');
            if (this.joc.vides <= 0) { 
                $('.loss').show();
                updateRanking();
            }
            return;
            /*
            exces = (trajectoria.puntB.y + this.radi - joc.alcada) / this.vy;
            this.posicio.x = trajectoria.puntB.x - exces * this.vx;
            this.posicio.y = joc.alcada - this.radi;
            xoc = true;
            this.vy = -this.vy;
            */
        }

        if (trajectoria.puntB.y - this.radi < 0) {
            exces = (trajectoria.puntB.y - this.radi) / this.vy;
            this.posicio.x = trajectoria.puntB.x - exces * this.vx;
            this.posicio.y = this.radi;
            xoc = true;
            this.vy = -this.vy;
            playSound('hit');
        }

        if (trajectoria.puntB.x + this.radi > joc.amplada) {
            exces = (trajectoria.puntB.x + this.radi - joc.amplada) / this.vx;
            this.posicio.x = joc.amplada - this.radi;
            this.posicio.y = trajectoria.puntB.y - exces * this.vy;
            xoc = true;
            this.vx = -this.vx;
            playSound('hit');
        }

        if (trajectoria.puntB.x - this.radi < 0) {
            exces = (trajectoria.puntB.x - this.radi) / this.vx;
            this.posicio.x = this.radi;
            this.posicio.y = trajectoria.puntB.y - exces * this.vy;
            xoc = true;
            this.vx = -this.vx;
            playSound('hit');
        }

        
        //Xoc amb un totxo
        let  totxoTocat = null;

        joc.mur.totxos.forEach((totxo) => {
            if (xoc) return;
            xoc = this.xocTotxo(totxo, trajectoria);
            if (xoc) totxoTocat = totxo;
        });

        if (!xoc) xoc = this.xocPala(trajectoria);

        if (!xoc) {
            this.posicio.x = trajectoria.puntB.x;
            this.posicio.y = trajectoria.puntB.y;
        } else if(totxoTocat) {
            joc.mur.eliminarTotxo(totxoTocat);
            joc.addScore(50);
            if (this.joc.mur.totxos.length == 0) { 
                this.joc.mur.nextLevel();
                this.joc.bola.resetPosicio();
                this.joc.pala.resetPosicio();
            }

        }


    }

    resetPosicio() { 
        this.posicio.x = 150;
        this.posicio.y = this.pala.posicio.y - this.radi - 1.5;
        this.vx = 0;
        this.vy = 0;
    }

    xocTotxo(totxo, trajectoria) {
        let x = false;
        //Xoc amb un totxo
        let xocTotxo = this.interseccioSegmentRectangle(trajectoria, {
            posicio: { x: totxo.posicio.x - this.radi, y: totxo.posicio.y - this.radi },
            amplada: totxo.amplada + 2 * this.radi,
            alcada: totxo.alcada + 2 * this.radi
        });

        if (xocTotxo) {
            x = true;
            this.posicio.x = xocTotxo.pI.x;
            this.posicio.y = xocTotxo.pI.y;
            switch (xocTotxo.vora) {
                case "superior":
                case "inferior": this.vy = -this.vy;
                    break;
                case "esquerra":
                case "dreta": this.vx = -this.vx;
                    break;
            }
        }

        return x;
    }

    xocPala(trajectoria) {
        let x = false;
        //Xoc amb un totxo
        let xocPala = this.interseccioSegmentRectangle(trajectoria, {
            posicio: { x: this.pala.posicio.x - this.radi, y: this.pala.posicio.y - this.radi },
            amplada: this.pala.amplada + 2 * this.radi,
            alcada: this.pala.alcada + 2 * this.radi
        });

        if (xocPala) {
            x = true;
            this.posicio.x = xocPala.pI.x;
            this.posicio.y = xocPala.pI.y;
            switch (xocPala.vora) {
                case "superior":
                case "inferior":
                    let distToCenter = this.pala.posicio.x + this.pala.amplada/2 - this.posicio.x;
                    this.vy = -this.vy;
                    this.vx = -1*distToCenter / 8;
                    break;
                case "esquerra":
                case "dreta": this.vx = -this.vx;
                    break;
            }
            playSound('hit');
        }

        return x;
    }

    interseccioSegmentRectangle(segment, rectangle) {

        //REVISAR SI EXISTEIX UN PUNT D'INTERSECCIÓ EN UN DELS 4 SEGMENTS
        //SI EXISTEIX, QUIN ÉS AQUEST PUNT
        //si hi ha més d'un, el més ajustat
        let puntI;
        let distanciaI;
        let puntIMin;
        let distanciaIMin = Infinity;
        let voraI;

        //calcular punt d'intersecció amb les 4 vores del rectangle
        // necessitem coneixer els 4 segments del rectangle
        //vora superior
        let segmentVoraSuperior = new Segment(rectangle.posicio,
            new Punt(rectangle.posicio.x + rectangle.amplada, rectangle.posicio.y));
        //vora inferior
        let segmentVoraInferior = new Segment(
            new Punt(rectangle.posicio.x,
                rectangle.posicio.y + rectangle.alcada),
            new Punt(rectangle.posicio.x + rectangle.amplada,
                rectangle.posicio.y + rectangle.alcada));

        //vora esquerra
        let segmentVoraEsquerra = new Segment(rectangle.posicio,
            new Punt(rectangle.posicio.x, rectangle.posicio.y + rectangle.alcada));


        //vora dreta
        let segmentVoraDreta = new Segment(
            new Punt(rectangle.posicio.x + rectangle.amplada,
                rectangle.posicio.y),
            new Punt(rectangle.posicio.x + rectangle.amplada,
                rectangle.posicio.y + rectangle.alcada));



        //vora superior
        puntI = segment.puntInterseccio(segmentVoraSuperior);
        if (puntI) {
            //distancia entre dos punts, el punt inicial del segment i el punt d'intersecció
            distanciaI = Punt.distanciaDosPunts(segment.puntA, puntI);
            if (distanciaI < distanciaIMin) {
                distanciaIMin = distanciaI;
                puntIMin = puntI;
                voraI = "superior";
            }
        }
        //vora inferior
        puntI = segment.puntInterseccio(segmentVoraInferior);
        if (puntI) {
            //distancia entre dos punts, el punt inicial del segment i el punt d'intersecció
            distanciaI = Punt.distanciaDosPunts(segment.puntA, puntI);
            if (distanciaI < distanciaIMin) {
                distanciaIMin = distanciaI;
                puntIMin = puntI;
                voraI = "inferior";
            }
        }
        //vora esquerra
        puntI = segment.puntInterseccio(segmentVoraEsquerra);
        if (puntI) {
            //distancia entre dos punts, el punt inicial del segment i el punt d'intersecció
            distanciaI = Punt.distanciaDosPunts(segment.puntA, puntI);
            if (distanciaI < distanciaIMin) {
                distanciaIMin = distanciaI;
                puntIMin = puntI;
                voraI = "esquerra";
            }
        }
        //vora dreta
        puntI = segment.puntInterseccio(segmentVoraDreta);
        if (puntI) {
            //distancia entre dos punts, el punt inicial del segment i el punt d'intersecció
            distanciaI = Punt.distanciaDosPunts(segment.puntA, puntI);
            if (distanciaI < distanciaIMin) {
                distanciaIMin = distanciaI;
                puntIMin = puntI;
                voraI = "dreta";
            }
        }

        if (voraI) {
            return { pI: puntIMin, vora: voraI };
        }
    }
}