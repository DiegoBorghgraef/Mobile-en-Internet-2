/*jslint plusplus: true */
/*global i */
var images = ["nomine1.gif", "nomine2.gif", "nomine3.gif"];
var clickedArray = new Array();
var mijnen, score, aantal, minesArray, randomNum, randomNum2, randomNumber, randomJoker;
score = 0;
aantal = 64;
var lives = 3;
var isPlaying = false;

function myHearts() {
    "use strict";
    document.getElementById("myHearts").innerHTML = "Levens : " + lives;
}
function aantalMines(mijnen) {
    'use strict';
    minesArray = new Array();
    //mijnen = window.prompt("Hoeveel Mines wil je op je veld?", "");
    //if (mijnen == 0 || mijnen >= aantal) {
    //    alert("Foute waarde ingevoerd, gelieve opnieuw te proberen");
    //    aantalMines();
    //}
    //else { 
    isPlaying = true;
    myHearts();
    for (i = 1; i <= mijnen; i++) {
        randomNum = randomNumber(1, aantal);
        if ((jQuery.inArray(randomNum, minesArray)) === -1) {
            minesArray.push(randomNum);
        }
        else {
            randomNum2 = randomNumber(1, aantal);
            if ((jQuery.inArray(randomNum2, minesArray)) === -1) {
                minesArray.push(randomNum2);
            }
        }
    }
}

function myScore() {
    "use strict";
    document.getElementById("myScore").innerHTML = "Score : " + score;
}
function randomNumber(lowest, highest) {
    var adjustedHigh = (highest - lowest) + 1;
    return Math.floor(Math.random() * adjustedHigh) + parseFloat(lowest);
}

function retry() {
    isPlaying = false;
    mijnen = 0;
    minesArray = [];
    clickedArray = [];
    score = 0;
    lives = 3;
    for (i = 0; i < aantal; i++) {
        document.images[i].src = "/img/wood.png";
    }
    window.status = "Spel werd gereset !";
    alert("U kan het spel opnieuw starten!");
}

function showMines() {
    for (i = 0; i <= aantal; i++) {
        if ((jQuery.inArray(i, minesArray)) != -1) {
            document.images[i].src = "mine.gif";
        }
    }
}

function playGame(num) {
    if (isPlaying && ((jQuery.inArray(num, clickedArray)) === -1)) {
        // Anders werken de Mijnen niet.
        myScore();
        myHearts();
        clickedArray.push(num);
        //alert("clickedArray = " + clickedArray);
        if ((jQuery.inArray(num, minesArray)) === -1) {
            //alert("Num = " + num + " || Mines = " + minesArray);
            var randomNum = Math.floor((Math.random() * 13) + 1);
            var randomJoker = Math.floor((Math.random() * 5) + 1);
        }
        else {
            if (lives > 0) {
                document.images[num].src = "mine.gif";
                lives--;
                score = score - 5;
                myScore();
                //alert("Boom, Je hebt nog " + lives + " levens over!");
                myHearts();
            }
            else if (lives <= 0) {
                document.images[num].src = "mine.gif";
                alert("Boom, al je levens zijn opgebruikt");
                showMines();
                myHearts();
                isPlaying = false;
            }
        }
        if (randomNum >= 1 && randomNum <= 5) {
            score++;
            myScore();
            document.images[num].src = "nomine1.gif";
        }
        else if (randomNum >= 6 && randomNum <= 9) {
            score++;
            score++;
            myScore();
            document.images[num].src = "nomine2.gif";
        }
        else if (randomNum >= 10 && randomNum <= 12) {
            score = score + 3;
            myScore();
            document.images[num].src = "nomine3.gif";
        }
        else if (randomNum >= 13) {
            score = score + randomJoker;
            myScore();
            document.images[num].src = "joker.png";
        }
        else if (score > 0 && lives == 0) {
            //alert("Uw hebt : " + score + " punten");
        }
    }
}

function info() {
    if (typeof (Storage) !== "undefined") {
        var myScore = document.getElementById("myScore").value;
        var naam = document.getElementById("naam").value;
        localStorage.myScore = score;
        localStorage.naam = naam;
        document.getElementById("result").innerHTML = localStorage.myScore + " " + " " + localStorage.naam;
    }
    else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
    }
}