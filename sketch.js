var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;


//create feed and lastFed variable here
var feed, lastFed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  feed=createButton("Feed");
  feed.position(750,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();


  today = new Date();
  time = today.getHours() + ":" + today.getMinutes()

  //write code to read fedtime value from the database 
  
  var gameStateRef  = database.ref('FeedTime');
    gameStateRef.on("value",function(data){
       lastFed = data.val();
    })
 
  //write code to display text lastFed time here
  textSize(30);
  fill("white");
  text("last fed: " + lastFed, 700, 95);
  noFill();
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time

  foodS--;
  database.ref('/').update({
    Food:foodS,
    FeedTime:time
  })

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
