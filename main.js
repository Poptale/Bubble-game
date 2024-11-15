let dot = document.querySelector(".dot");
let outline = document.querySelector(".outline");
window.addEventListener("mousemove", (e)=>{
    let posX = e.clientX;
    let posY = e.clientY;
    dot.style.left = `${posX}px`;
    dot.style.top = `${posY}px`;
    outline.animate({
    left: `${posX}px`,
    top: `${posY}px`
    }, {duration: 300, fill: "forwards"});
});
let timer = 60;
let score = 0;
let hitrn = 0;
let correct = 0;
let wrong = 0;
let errorSound = new Audio ("wrongSound.mp4");
let shit = new Audio("shit.mp4");
function makebubbles(){
    let clutter = "";
    for (let i = 0; i < 152; i++) {
    let random = Math.floor(Math.random()*10);
    clutter += `<div class="bubble">${random}</div>`;
}
document.querySelector(".bubbles-container").innerHTML = clutter;
}
function decTimer(){
    setInterval(()=> {
        if(timer>0){
            timer--;
            document.querySelector(".time").innerHTML = timer;
             if(timer = 10){
                 document.querySelector(".time").style.color = "red";
                 shit.play();
            } 
        }else{
                document.querySelector(".bubbles-container").style.display = "none";
                document.querySelector(".pannel").style.display = "none";
                document.querySelector(".gameOver").style.display = "block";
        }
},1000)
}
function generateHit(){
    hitrn = Math.floor(Math.random()*10);
    document.querySelector(".hit").innerHTML = hitrn;
}
function incScore(){
    score += 10;
    let ps = document.querySelector(".spScore");
    ps.innerHTML = score;
    document.querySelector(".spHits").innerHTML = score/10;

    document.querySelector(".score").innerHTML = score;
}
    document.querySelector(".bubbles-container").addEventListener("click", (dets)=>{
        let numberClicked = (Number(dets.target.textContent));
        if (numberClicked === hitrn){
            correct++;
            wrong++;
            incScore();
            makebubbles();
            generateHit();
        } else if (numberClicked !== hitrn){
            dets.target.style.color = "red";
            errorSound.currentTime = 0;
            errorSound.play();
            wrong++;
        }
        document.querySelector(".spAc").innerHTML = Math.floor((correct/wrong)*100) + "%";
    });
generateHit();
decTimer();
makebubbles();

document.querySelector(".try-again").addEventListener("click", ()=> {
    score=0;
    timer=60;
    document.querySelector(".bubbles-container").style.display = "flex";
    document.querySelector(".pannel").style.display = "flex";
    document.querySelector(".gameOver").style.display = "none";
})