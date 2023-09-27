var deadSound = new Audio("dead.mp3");
var runSound = new Audio("run.mp3");
var jumpSound = new Audio("jump.mp3");

function KeyCheck(event){
    var k=event.which;

    if(k==13){  //Enter
        if (runWorkerNumber == 0){
            runWorkerNumber = setInterval(run, 100);
            runSound.play();
        }

        if (backgroundWorkerNumber == 0){
            backgroundWorkerNumber = setInterval(moveBackground, 100);
        }

        if (boxWorkerNumber == 0){
            boxWorkerNumber = setInterval(moveBoxes, 100);
        }

    }

    if(k==32){   //Space
        if (jumpWorkerNumber == 0){
            clearInterval(runWorkerNumber);
            runSound.pause();

            jumpWorkerNumber = setInterval(jump, 100);
            jumpSound.play();
        }
    }
}

var runImageNumber = 1;
var runWorkerNumber = 0;

function run(){
    runImageNumber = runImageNumber + 1;

    if(runImageNumber == 9){
        runImageNumber = 1;
    }

    document.getElementById("boy").src= "Run ("+runImageNumber+").png";
}

var backgroundMarginLeft = 0;
var backgroundWorkerNumber = 0;

var score = 0;

function moveBackground(){
    score = score + 1;
    document.getElementById("score").innerHTML = score;
    backgroundMarginLeft = backgroundMarginLeft - 15;

    document.getElementById("back").style.backgroundPositionX = backgroundMarginLeft + "px";
}

var jumpImageNumber = 1;
var jumpWorkerNumber = 0;

var boyMarginTop = 385;

function jump(){

    if(jumpImageNumber <= 6){
        boyMarginTop = boyMarginTop - 30;
        document.getElementById("boy").style.marginTop = boyMarginTop + "px";
    }

    if(jumpImageNumber >= 7){
        boyMarginTop = boyMarginTop + 30;
        document.getElementById("boy").style.marginTop = boyMarginTop + "px";
    }

    jumpImageNumber = jumpImageNumber + 1;

    if(jumpImageNumber == 13){
        clearInterval(jumpWorkerNumber); //Stop jump function
        jumpImageNumber = 1;
        jumpWorkerNumber = 0; //Fix onetime jump
        runWorkerNumber = setInterval(run, 100); //Run after jump
        runSound.play();

        if (backgroundWorkerNumber == 0){
            backgroundWorkerNumber = setInterval(moveBackground, 100);
        }

        if (boxWorkerNumber == 0){
            boxWorkerNumber = setInterval(moveBoxes, 100);
        }
    }
    

    document.getElementById("boy").src= "Jump (" + jumpImageNumber + ").png";
}

var boxMarginLeft = 300;

function createBoxes(){
    for (var i = 0; i <10; i++){
        var box = document.createElement("div");
        box.className = "box";
        box.id = "box" + i;

        if(i < 5){
            boxMarginLeft = boxMarginLeft + 700;
        }
        if(i >= 6){
            boxMarginLeft = boxMarginLeft + 500;
        }

        box.style.marginLeft = boxMarginLeft + "px";
        document.getElementById("back").appendChild(box);
    }
}

var boxWorkerNumber = 0;

function moveBoxes(){
    for (var i =0; i <10; i++){
        var box = document.getElementById("box" + i);
        var currentMarginLeft = getComputedStyle(box).marginLeft;
        var newMarginLeft = parseInt(currentMarginLeft) - 15;
        box.style.marginLeft = newMarginLeft + "px";

        //alert(newMarginLeft);
        //180px - 80px
        if (newMarginLeft >= 90 & newMarginLeft <= 150){
            if(boyMarginTop > 350){
            clearInterval(runWorkerNumber);
            runSound.pause();
            runWorkerNumber = -1;
            
            clearInterval(jumpWorkerNumber);
            jumpSound.pause();
            jumpWorkerNumber = -1;

            clearInterval(backgroundWorkerNumber);
            backgroundWorkerNumber = -1;

            clearInterval(boxWorkerNumber);
            boxWorkerNumber = -1;

            deadWorkerNumber = setInterval(dead, 100);
            deadSound.play();
            
            }
        }
    }
}

var deadImageNumber = 1;
var deadWorkerNumber = 0;

function dead(){
    deadImageNumber = deadImageNumber + 1;

    if(deadImageNumber == 11){
        deadImageNumber = 10;
        document.getElementById("boy").style.marginTop = "385px";
        clearInterval(deadWorkerNumber);
        document.getElementById("endGame").style.visibility = "visible";
        document.getElementById("endScore").innerHTML = score;
    }
    document.getElementById("boy").src = "Dead (" + deadImageNumber +").png";
}

function reload(){
    location.reload();
}

function startGame(){
    location.href = "index.html";
}

function end(){
    location.href = "start.html";
}



