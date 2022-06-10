class Display { 
    constructor(joc) { 
        this.joc = joc;
    }

    draw(ctx) { 
        ctx.save();

        // contador de vides
        ctx.fillStyle = 'red';
        for (let i = 0; i < this.joc.vides; i++)
            ctx.fillRect(5 + i*10, 5, 5, 10);
        
        ctx.restore();
    }
}