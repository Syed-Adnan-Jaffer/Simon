let gameSeq =[];
let userSeq = [];

let btns = ['yellow' , 'red' , 'purple' , 'green'];

let started = false;
let level = 0;

let h2 = document.querySelector('h2');

document.addEventListener("keypress" ,function(){
    if(started == false){
        console.log("Game is started");
        started = true;
        levelUp();
    }
});


function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove('flash');
    },250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove('userflash');
    },250);
}


function levelUp(){
    userSeq = []; //when levelup is called the userseq is made as empty array inorder to enter the colors of gameSeq from start (in next level to match thr colors of previous level colors)
    level++;
    h2.innerText = `level ${level}`;

    // random color select
    let ranIdx = Math.floor(Math.random() * 3);
    let ranColor = btns[ranIdx];
    let ranbtn = document.querySelector(`.${ranColor}`);
    gameSeq.push(ranColor);
    console.log(gameSeq)
    gameFlash(ranbtn);
}

function checkAns(idx){ //function to check the game sequence and user sequence of colors
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp , 1000); //if gameseq reaches the last index then calling the levelup again to generate new colors
        }
    }else{
        h2.innerHTML = `Game over..! Your score was <b>${level} </b> <br> Press any key to start Game again `;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },150)
        reset(); //restarting the game after losing with the help of reset function
    } 
}

function btnPress(){
    let btn = this; //current button which is pressed 
    userFlash(btn);

    userColor = btn.getAttribute("id"); //getting specific color by using id which has single color
    userSeq.push(userColor);
    
    checkAns(userSeq.length-1); // entering the value of last user clicked index value
}

let allBtns  = document.querySelectorAll('.btn');
for(btn of allBtns){
    btn.addEventListener("click" , btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [] ;
    level = 0 ;
}