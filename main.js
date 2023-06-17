const tabu = document.querySelector('.tabu');
const score = document.getElementById('score');
const result = document.getElementById('result');
const start = document.getElementById('start');
let direction = 127;
const width = 15;
const widthL = 120;
const widthR = 134;
let speed = 500
let lasers = 0

tabu.children[direction].classList.add('ship');

document.addEventListener('keyup' , move);

function move(e){
    tabu.children[direction].classList.remove('ship');
    if(e.keyCode == 37 && direction > widthL ){
        direction -=1
    } else if(e.keyCode == 39 && direction < widthR){
        direction +=1
    }
    if(e.keyCode == 32){
        Shoot();
    }
    tabu.children[direction].classList.add('ship');
}

let arrayInva = [
    1,2,3,4,5,6,7,8,9,10,11,16,17,18,19,20,21,22,23,24,25,26,31,32,32,33,34,35,36,37,38,39,40,41
]
let y = 0;

let map1 = arrayInva;
function Shoot(){
    let shot =  direction - width;
    const Interval = setInterval(() =>{
        tabu.children[shot].classList.add('shots');
        tabu.children[shot+width].classList.remove('shots'); 
            if(tabu.children[shot].classList.contains('invaders')){
                didHit(shot);
                clearInterval(Interval);
                arrayInva.splice(arrayInva.indexOf(shot),1)
                
                setTimeout(()=>{
                    if(shot<13){
                        tabu.children[shot].classList.remove('hit');
                    } 
                        tabu.children[shot+width].classList.remove('hit');
                },100);
            }
            shot - width >=0? shot = shot-width: shot = shot;
        },100)

    setTimeout( ()=> {
        tabu.children[shot].classList.remove('shots');
        clearInterval(Interval);
    },900)
    
};

let z = 2;
let l = false;
let startGameOn = false

function invaders(){   
    if(startGameOn){
        result.innerHTML = '';
        arrayInva.forEach(x=>{
            tabu.children[x].classList.remove('invaders');
        }) 

        if(z > 4){
            arrayInva = arrayInva.map(x => x+width);
            if(l){
                l= false
            } else {
                l = true
            }
            z=0
        }else if(l){
            arrayInva = arrayInva.map(x => x-1);
        }else {
            arrayInva = arrayInva.map(x => x+1);
        }
        
        arrayInva.forEach(x =>{
            tabu.children[x].classList.add('invaders');
        }) 

        if(arrayInva.length == 0){
            result.innerHTML = 'Voce Venceu';
            startGameOn = false;
        }

        isOver();
        z++
    } else {
        arrayInva = [
            1,2,3,4,5,6,7,8,9,10,11,16,17,18,19,20,21,22,23,24,25,26,31,32,32,33,34,35,36,37,38,39,40,41
        ];
        z=2;
        l = false;
    }
}

function didHit(shot){
    lasers++
    tabu.children[shot].classList.add('hit');
    tabu.children[shot].classList.remove('invaders');
    tabu.children[shot].classList.remove('shots');
    score.textContent = lasers
}

function isOver(){
    if((tabu.children[120].classList.contains('invaders'))){
        clearTabu();
        result.innerHTML = 'Voce perdeu';
        score.textContent = '';
        startGameOn = false;
        lasers = 0;
    }
}

const invasores = setInterval(invaders,speed);

function startGame(){
    startGameOn = true
}

function clearTabu(){
    const arr = Array.from(tabu.children);
    arr.forEach(x =>{
        if(x.classList.contains('invaders')){
            x.classList.remove('invaders');
        }   
    })
    arrayInva = [];

}


start.addEventListener('click' , startGame )