var pattern = [];
var userpattern = [];
var colors = ["red", "blue", "green", "yellow"];
var inc = 0;
var started = false;

$(".newbutton").click(function() {
    if (!started) {
        nxtseq();
        started = true;
    }
});

function nxtseq(){
    var num = Math.random() * 4;
    num = Math.floor(num);
    var rndcolor = colors[num];
    pattern.push(rndcolor);
    $("#" + rndcolor).fadeIn(100).fadeOut(100).fadeIn(100);
    var aud = new Audio("./"+rndcolor+".mp3");
    aud.play();
    playSound(rndcolor);
    inc++;
    $("h1").text("Level "+inc);
}

function playSound(color) {
    var aud = new Audio("./" + color + ".mp3");
    aud.play();
}

$(document).keypress(function(){
    if (!started) {
        nxtseq();
        started = true;
    }
});

function startOver() {
    inc = 0;
    pattern = [];
    started = false;
    userpattern = [];
    $("h1").text("Press A Key to Start");
    $("body").removeClass("game-over");
}

function checkAnswer(currentLevel) {
    if (userpattern[currentLevel] === pattern[currentLevel]) {
        console.log("success");
        if (userpattern.length === pattern.length) {
            setTimeout(function() {
                nxtseq();
            }, 1000);
            userpattern = [];
        }
    } else {
        console.log("wrong");
        var wrong = new Audio("./wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

$(".btn").click(function(){
    var usercolor = $(this).attr("id");
    userpattern.push(usercolor);
    $("#" + usercolor).fadeIn(100).fadeOut(100).fadeIn(100);
    var aud1 = new Audio("./"+usercolor+".mp3");
    aud1.play();
    checkAnswer(userpattern.length - 1);
});
