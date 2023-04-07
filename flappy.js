const bird = document.querySelector(".bird");
bird.style.top = 43 + "vh";
let i = 43;
let imax = 0;
let imin = 100;
let birdInCage = false;
function birdGoesDown(){
    console.log(i,imax);
    if(i < 87){
        if(i>imin && birdInCage){
            clearInterval(birdInterval);
            clearInterval(moveInterval);
            clearInterval(blockInterval);
            i = imin;
        }
        else{
            i+=1;
        }
        bird.style.top = i + "vh";
    }
    else{
        console.log("i dont know how to delete interval");
    }
}
let firstClick = true;
document.body.addEventListener("keypress",(event)=>{
    if(event.key == " "){
        document.body.click();
    }
})
let birdInterval;
document.body.addEventListener("click",()=>{
    if(firstClick){
        game();
        birdInterval = setInterval(birdGoesDown, 20);
        firstClick = false;
    }
    if(i - 15 < imax && birdInCage){
        i = imax;
        clearInterval(birdInterval);
        clearInterval(moveInterval);
        clearInterval(blockInterval);
    }
    else if(i >= imin && birdInCage){
        i = i;
    }
    else{
        i-= 15;
    }
    bird.style.top = i + "vh";
})
let numOfBlocks = 1;
function newBlock(){
    const upperBlock = document.createElement("div");
    upperBlock.classList.add("upper-block");
    upperBlock.id = numOfBlocks;
    let upperHeight = Math.random()*67;
    upperBlock.style.height = upperHeight + "vh";
    upperBlock.style.right = "-10vw"
    document.body.appendChild(upperBlock);
    const downBlock = document.createElement("div");
    downBlock.classList.add("down-block");
    downBlock.id = numOfBlocks;
    downBlock.style.height = (100 - upperHeight - 33) + "vh";
    downBlock.style.right = "-10vw"
    document.body.appendChild(downBlock);
    numOfBlocks+=1;
}
function removeBlock(){
    document.querySelector(".upper-block").remove();
    document.querySelector(".down-block").remove();
}
let right = -10;
let moveInterval;
let blockInterval;
function game(){
    moveInterval = setInterval(moveBlock, 50);
    blockInterval = setInterval(newBlock, 3000);
}
function moveBlock(){
    let blockUp = document.querySelectorAll(".upper-block");
    let blockDown = document.querySelectorAll(".down-block");
    let firstElem = true;
    blockUp.forEach((el)=>{
        var test = el.style.right;
        var testRight = parseInt(test.slice(0,test.length - 2), 10);
        if(testRight < 110){
            testRight += 1;
            el.style.right = testRight + 'vw';
        }
        else{
            removeBlock();
        }
        if(firstElem){
            firstElem = false;
            imax = parseInt(el.style.height.slice(0, el.style.height.length-2),10);
            imin = imax + 19;
            console.log(testRight)
            if(testRight > 69 && testRight < 86){
                birdInCage = true;
                if(i <= parseInt(el.style.height.slice(0, el.style.height.length-2),10)){
                    // bird.style.top = parseInt(el.style.height.slice(0, el.style.height.length-2),10) + "vh";
                    clearInterval(birdInterval);
                    clearInterval(moveInterval);
                    clearInterval(blockInterval);
                    console.log(i,el.style.height.slice(0, el.style.height.length-2))
                }
            }
            else{
                birdInCage = false;
            }
        }
    })
    firstElem = true;
    blockDown.forEach((el)=>{
        var test = el.style.right;
        var testRight = parseInt(test.slice(0,test.length - 2), 10);
        if(testRight < 110){
            el.style.right = testRight + 1 + 'vw';
        }
        if(firstElem){
            if(birdInCage){
                if(i >= imin){
                    // bird.style.top = parseInt(el.style.height.slice(0, el.style.height.length-2),10) + "vh";
                    clearInterval(birdInterval);
                    clearInterval(moveInterval);
                    clearInterval(blockInterval);
                    console.log(i,el.style.height.slice(0, el.style.height.length-2))
                }
            }
        }
    })
}