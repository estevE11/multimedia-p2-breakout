$(document).ready(function () {

    let myCanvas = document.getElementById("joc");
    let ctx = myCanvas.getContext("2d");

    joc = new Joc(myCanvas, ctx);
    joc.velocitat = 1;
    ///joc.inicialitza();
  
    $('#check_mute').prop('checked', true);
    $('#check_mute').change(function () {
        const muted = $('#check_mute').is(':checked');
        setMute(muted);
        localStorage['mute'] = muted;
    });

    $('#play').click(function () {
        joc.username = prompt("Nom d'usuari");
        $('#mainmenu').hide();
        $('#principal').show();
        joc.inicialitza();
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

function playSound(sound) { 
    const muted = $('#check_mute').is(':checked');
    if(!muted) 
        document.getElementById("sound_" + sound).play();
}