class Display { 
    constructor(joc) { 
        this.joc = joc;
    }

    draw(ctx) { 
        ctx.save();

        // contador de vides
        let vides = "";
        for (let i = 0; i < this.joc.vides; i++)
            vides += '❤️';
        ctx.fillText(vides, 10, 140);
            
        ctx.fillStyle = 'black';
        ctx.fillText("Puntuació: " + this.joc.score, 10, 15);
        ctx.fillText("Record: " + this.joc.hiscore, 10, 25);
        
        ctx.restore();
    }
}