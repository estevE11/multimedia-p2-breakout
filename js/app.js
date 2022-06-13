$(document).ready(function() {

    let myCanvas = document.getElementById("joc");
    let ctx = myCanvas.getContext("2d");

    joc = new Joc(myCanvas,ctx);
    joc.velocitat=1;
    joc.inicialitza();
  
    $('#check_mute').change(function () {
        const muted = $('#check_mute').is(':checked');
        setMute(muted);
    });
});

function setMute(val) { 
    const elems = document.querySelectorAll("video, audio");
    for (const el of elems) {
        el.muted = val;
        el.pause();
    }
}

function animacio() {
    joc.update();
    requestAnimationFrame(animacio);
}