$(document).ready(function () {

    let myCanvas = document.getElementById("joc");
    let ctx = myCanvas.getContext("2d");

    joc = new Joc(myCanvas, ctx);
    joc.velocitat = 1;
    ///joc.inicialitza();

    updateRanking();

    $('#check_mute').prop('checked', true);
    $('#check_mute').change(function () {
        const muted = $('#check_mute').is(':checked');
        setMute(muted);
        localStorage['mute'] = muted;
    });

    $('#play').click(function () {
        joc.setUsername(prompt("Nom d'usuari"));
        $('#mainmenu').hide();
        $('#principal').show();
        joc.inicialitza();
    });
    
    $('.btn-menu').click(function () { 
        $('.modal').hide();
        $('#principal').hide();
        $('#mainmenu').show();
    });
});

function updateRanking() {
    let orderedScores = [];
    let scores = {};
    let val = localStorage['scores'];

    if (val) {
        scores = JSON.parse(val);
    }

    if (Object.keys(scores).length > 0) {
        console.log('caca');
        while (orderedScores.length < 3 && Object.keys(scores).length > 0) {
            const keys = Object.keys(scores);
            let hi = keys[0];
            for (let i = 1; i < keys.length; i++) {
                if (scores[keys[i]] > scores[hi]) {
                    hi = keys[i];
                }
            }
            orderedScores.push(hi + ' - ' + scores[hi] + 'pts');
            delete scores[hi];
        }
    }

    orderedScores.forEach(function (it, i) {
        $('#ranking' + (i + 1)).text(it);
    });
}

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