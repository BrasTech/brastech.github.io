//Все ресурсы игры
class Resources{
  constructor() {
    this.shapka=loadImage('shapka.png');
     this.applogo=loadImage('applogo.png');
  this.clouds=[];
  this.clouds.push(loadImage('sources/cloud1.png'));
  this.clouds.push(loadImage('sources/cloud2.png'));
  this.clouds.push(loadImage('sources/cloud3.png'));
  this.background=loadImage('sources/background.png');
  this.player_run=[];
  this.player_run.push(loadImage('Run2.png'));
  this.player_run.push(loadImage('Run1.png'));
  this.player_run.push(loadImage('Run3.png'));
  this.player_lose=loadImage('Run1.png');
  this.player_jump=loadImage('Jump.png')
  this.ground=loadImage('sources/ground.png');
  this.barrel=loadImage('Barier.png');
  this.font = loadFont('sources/18917.ttf');
    
  }
}
//Игрок
class Player{
  constructor(resources,barrel) {
  this.player_run=resources.player_run;
  this.barrel=barrel;
  this.player_lose=resources.player_lose;
  this.player_jump=resources.player_jump;
  this.is_jumping=false;
  this.score=0; 
  this.size=height/5;
  this.end=false;
  this.buffer=false;
  this.y=height/2+height/2/2.74-this.size;
  this.reverse_jump=false;
  this.block_jump=false;
  this.awaiter=0;
  this.jump_height=this.size/1.5;
  this.jump=0;
  this.speed=1;
  this.barrel_active=false;
  }
  Run(){
    if(this.barrel_active==false)
    if(this.barrel.x>=0&&this.barrel.x<=this.size){
        this.barrel_active=true;
    }
    if(this.barrel_active==true){
      if(this.CheckBarrel()==false) {
        this.end=true;
      }
      if(this.barrel.x<=0){
        this.barrel_active=false;
        this.score++;
        this.buffer=true;
      }
    }
    if(this.is_jumping){
      this.RealJump();
      this.y=height/2+height/2/2.74-this.size-this.jump;
      image(this.player_jump,0,this.y,this.size,this.size);
      this.temp=image(this.player_jump,0,this.y,this.size,this.size);
    }
    else
    if(this.awaiter<15/this.speed){
      this.y=height/2+height/2/2.74-this.size;
      image(this.player_run[0],0,this.y,this.size,this.size);
      this.temp= image(this.player_run[0],0,this.y,this.size,this.size);
    }
    else if(this.awaiter<30/this.speed){
      this.y=height/2+height/2/2.74-this.size;
      image(this.player_run[1],0,this.y,this.size,this.size);
      this.temp= image(this.player_run[1],0,this.y,this.size,this.size);
    }
    else{
      this.y=height/2+height/2/2.74-this.size;
      image(this.player_run[2],0,this.y,this.size,this.size);
      this.temp= image(this.player_run[2],0,this.y,this.size,this.size);
      
    }
    if(this.awaiter>=45/this.speed) this.awaiter=0;
    else this.awaiter++;
  }
  SetSpeed(speed){
    this.speed=speed;
  }
  Jump(){
    if(!this.end)
    if(!this.is_jumping)
    if(!this.block_jump){
      this.is_jumping=true;
        this.end=false;
        this.jump_is_ended=false;
    }
  }
  CheckBarrel(){
    this.center_x=this.size/2;
    this.center_y=this.y+(this.size/2);
    this.barrel_center_x=this.barrel.x+(this.barrel.height/2);
    this.barrel_center_y=this.barrel.y+(this.barrel.height/2);
    this.data=sqrt(Math.pow(this.center_x-this.barrel_center_x,2)+Math.pow(this.center_y-this.barrel_center_y,2));
    if(this.data<this.size-this.size/2.5)
    return false;
    else return true;
    
  }
  RealJump(){
    if(this.reverse_jump){
      this.jump=this.jump-this.speed;
          if(this.jump<=0){
      this.reverse_jump=false;
      this.is_jumping=false;
    }
    }
    else{
    this.jump=this.jump+this.speed;
    if(this.jump>this.jump_height){
      this.reverse_jump=true;
    }
    }
  }
}
class Barrel{
   constructor(resources) {
     this.img=resources.barrel;
     this.speed=1;
     this.height=height/5;
     this.x=width;
     this.isCreated=false;
   }
  onDraw(speed){
    if(this.isCreated==false){
      this.height=random(height/25,height/20);
      this.speed=speed;
      this.y=height/2+height/2/2.74-this.height;
      this.isCreated=true;
    }
    image(this.img,this.x,this.y,this.height,this.height);
    this.x=this.x-this.speed;
    if(this.x<=-this.height) {
      this.x=width;
      this.isCreated=false;
    }
  }
}
//Анимация сзади
let background_x=0;
let background_x_=0
function BackgroundAnimation(speed){
   image(resources.background,background_x_,0,width,height);
    image(resources.background,background_x_+width,0,width,height);
    image(resources.ground,background_x,height/2,width,height/2);
    image(resources.ground,background_x+width,height/2,width,height/2);
    if(background_x<=-width) background_x=0;
    background_x=background_x-speed;
      if(background_x_<=-width) background_x_=0;
    background_x_=background_x_-0.2*speed;
}

function SetScore(score){
  textFont(resources.font);
  textSize(10);
  textAlign(LEFT);
  text('Счёт: '+score,0 ,10);
}
let score=0;
let resources,player,barrrel;
let loading=true;
var button;
function setup() {
  frameRate(240);
  var canvas=createCanvas(displayWidth, displayHeight);
   canvas.parent('sketch-holder');
    resources=new Resources();
  //button = createButton('click me');
  //button.position(19, 19);
  //button.mousePressed(NewGame);
  //button.hide();
  barrel=new Barrel(resources);
  player=new Player(resources,barrel);
}
let level=1;
let speed=4;
let counter=0;
let buffer=false;
function draw() {
  if(player.end!=true){
  BackgroundAnimation(speed); 
  barrel.onDraw(speed);
  player.SetSpeed(speed);
  player.Run();        SetScore(player.score);
  counter++;
    if(player.buffer) {
level++;                 speed=speed+1;
player.buffer=false;                }
  }
  else{ 
    barrel.onDraw(0);
  player.SetSpeed(0);
 BackgroundAnimation(0);    SetFinalText(player.score);
    //button.show();
   
  }
}
function NewGame() {
      button.hide();
}
function SetFinalText(result){
  textFont(resources.font);
  textSize(20);
    textAlign(CENTER);
  text('Твой результат: '+result, width/2,height/2);
}
function mousePressed() {
    player.Jump();
}
function touchStarted(){
 player.Jump();
}