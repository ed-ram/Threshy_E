const canvas=document.querySelector('canvas');
const ctx=canvas.getContext('2d');


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/*----- event listeners-----*/

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

window.addEventListener('mousemove',
  function(event){ //  anonymous function returns an event Object
  mouse.x = event.x;
  mouse.y = event.y;
});
function drawMouseCoordinates(){
    ctx.strokeStyle='black';
    ctx.font='20px Verdana';
    ctx.strokeText(mouse.x.toString()+','+mouse.y.toString()+'!',mouse.x+5, mouse.y)
}

/*----- variables -------*/
let counter = 0;
let on = true;
let mouse = {
    x: undefined,
    y: undefined
  }
let blockSize = canvas.width*0.1;
let entityArray = [];
/*----- drawing functions -------*/

const drawRect = (color,x,y,w,h) => {
    ctx.fillStyle=color;
    let adjustedX = x-(w*0.5);
    let adjustedY = y-(y*0.5);
    ctx.fillRect(adjustedX,adjustedY,w,h);
};

const expandoRect = (x,y) => {
    let width = (counter*5)+50;
    let height = (counter*5)+50;
    let adjustedX = x-(width*0.5);
    let adjustedY = y-(height*0.5);
    ctx.strokeRect(adjustedX,adjustedY,width,height);
};

const flickerBackground = (color1,color2,x,y,w,h) => {
    switch(on){
        case true:
        ctx.fillStyle=color1;
        ctx.fillRect(x,y,w,h);
        break;
        case false:
        ctx.fillStyle=color2;
        ctx.fillRect(x,y,w,h);
        break;
        default:
        fillRect(x,y,w,h);
        break
    };
}

const flicker = (threshold) => {
    r = Math.random();
    if(r<threshold){
        on = !on;
        return;
    }
}
const wobbleRect = (color,x,y,w,h,wobbleRange) => {
    ctx.fillStyle=color;
    let width = (Math.random()*wobbleRange) + w;
    let height = (Math.random()*wobbleRange) + h;
    let adjustedX = x-(width*0.5);
    let adjustedY = y-(height*0.5);
    ctx.fillRect(adjustedX,adjustedY,w,h);
};

function LineEntity(w,h,wobbleRange) {
    this.x = Math.random()*canvas.width;
    this.y = Math.random()*canvas.height;
    this.color=colorArray[Math.floor(Math.random()*colorArray.length)];
    this.width = (Math.random()*wobbleRange) + w;
    this.height = (Math.random()*wobbleRange) + h;
    this.adjustedX = this.x-(this.width*0.5);
    this.adjustedY = this.y-(this.height*0.5);
    this.draw = function() {
        ctx.fillStyle='green';
        ctx.fillRect(this.adjustedX,this.adjustedY,this.w,this.h);
        ctx.beginPath();
        ctx.moveTo(this.adjustedX,this.adjustedY);
        ctx.lineTo(0,0);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(this.adjustedX,this.adjustedY+h);
        ctx.lineTo(0,canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(this.adjustedX+this.w,this.adjustedY+this.h);
        ctx.lineTo(canvas.width,canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(this.adjustedX+this.w,this.adjustedY);
        ctx.lineTo(canvas.width,0);
        ctx.stroke(); 
    };   
    this.update = function() {
        this.width = (Math.random()*wobbleRange) + w;
        this.height = (Math.random()*wobbleRange) + h;
        this.adjustedX = this.x-(this.width*0.5);
        this.adjustedY = this.y-(this.height*0.5);
        this.draw();
        //console.log(this.adjustedX, this.adjustedY);
    }
};
/*
const  = [
    (function() {lineEntity('black',220,200,50,50,5)}),
    (function() {lineEntity('white',581,361,50,50,5)}),
    //['red',mouse.x,mouse.y,50,50,5]
];
*/

const colorArray = ['red','green','black','red','orange'];

function init(){
    entityArray = [];
    //let x = Math.random()*canvas.width;
    //let y = Math.random()*canvas.height;
    let w = blockSize;
    let h = blockSize;
    let wobbleRange = 5;
    for(i=0;i<5;i++){
        entityArray.push(new LineEntity(w,h,wobbleRange))
        console.log(entityArray);
    }
};  


/*--- animation control ----*/
function update(){
    //counter = (counter+1)%100;
    //console.log(counter);
    //ctx.clearRect(0,0,canvas.width,canvas.height);
    flicker(0.1); 
    flickerBackground('#070a36','#0f19a9',0,0,canvas.width,canvas.height);    
    for (var i=0; i<entityArray.length; i++){
        entityArray[i].update();
    };
    /*lineEntity('black',220,200,50,50,5);
    lineEntity('white',581,361,50,50,5);
    lineEntity('red',mouse.x,mouse.y,50,50,5);
    */
    //drawMouseCoordinates();
};
init();
const fps=15;
setInterval(update, 1000/fps);
