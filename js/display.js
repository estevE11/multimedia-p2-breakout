class Display { 
    constructor(joc) { 
        this.joc = joc;
    }

    draw(ctx) { 
        ctx.save();

        // contador de vides
        ctx.fillStyle = 'red';
        for (let i = 0; i < this.joc.vides; i++)
            ctx.fillRect(5 + i * 10, this.joc.canvas.height - 15, 5, 10);
        
        ctx.fillStyle = 'black';
        ctx.fillText("Score: " + this.joc.score, 10, 15);
        
        ctx.restore();
    }
}