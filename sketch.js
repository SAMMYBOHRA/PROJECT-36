//Create variables here
var dog,happyDog;
var dogI, hDogI;
var database;
var foodS,foodStock;
var fedTime, lastFed;
var foodObj;

function preload(){
	
  dogI = loadImage("images/dogImg.png");
  hDogI= loadImage("images/dogImg1.png");

}

function setup() {
  database =firebase.database();
  createCanvas(1000,500);
  
  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value",getFoodStock);

  dog = createSprite(800,220,150,150);
  dog.addImage(dogI);
  dog.scale=0.15
  
  feed = createButton("FEED THE DOG ");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("ADD FOOD");
  addFood.position(850,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
  background('lightgreen')

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  })
  
  fill(255);
  textSize(25);
  if(lastFed >= 12){
    text("LAST FEED : " + lastFed%12 +" PM ",350,30);
}else if(lastFed == 0){
  text("LAST FEED : 12 AM ",350,30);
}else{
  text("LAST FEED : " + lastFed + " AM ",350,30);
}


  drawSprites(); 
}

function getFoodStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);

}

function feedDog(){
  dog.addImage(hDogI)


  foodObj.updateFoodStock(foodObj.getFoodStock()-1);


  database.ref('/').update({
    Food:foodObj.getFoodStock(),
   FeedTime:hour()
  })

}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}



