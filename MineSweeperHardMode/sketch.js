/*Jeremy Eng
Hello!
For this assignment, I wanted to put a twist on minesweeper,
which is to introduce a fog of war, to a player that is navigating through a minefield.
The player always has a indication of how many mines are nearby and can only move one space at a time. 
The goal is to reach the end of the level, which is located at the top of the screen. 
*/
let board; 
let column;
let rows;
let w = 40; 

let dramatic, boom;
//loading sounds mp3
function preload(){
	//do not tell me encounter doesnt make this mundane game seem epic af
	dramatic = loadSound("assets/MGS.mp3");
	//kaboom
	boom = loadSound("assets/boom.mp3");
}


function setup() {
	dramatic.loop();
	dramatic.setVolume(.1); //when testing, could not hear the music playing except for the first time, idk if its working as intended or my server is buggy.
    createCanvas(801,801);
	column = int(width/w); 
	rows = int(height/w);
    board = create2dArray(column,rows);
  // Create the cells on the board so that we can display the game board and hold data for it
  for (let i =0; i< column; i++){
    for (let j = 0 ; j< rows; j++){
		if(i == int((column-1)/2) && j== rows-1){
			board[i][j] = new Cell( i, j, w, true);
		}
		else if (i == int((column-1)/2) && j== 0){
			board[i][j] = new Cell( i, j, w,false, true);
		}
		else{
    	board [i][j] = new Cell(i, j, w);
		}
      }
  }
	//Count the bombs neigboring for each spot
	for (let i =0; i< column; i++){
		for (let j = 0 ; j< rows; j++){
			board[i][j].countBomb();
		}

	}

}
			
//Looks complicated af, but basically 
//iterate till you find the player in the array
// when you do, designate only the region around the area as being able as being clicked
// follows the same principle as calculating for the surrounding area
function mousePressed() {
  for (var i = 0; i < column; i++) {
    for (var j = 0; j < rows; j++) {
		if (board[i][j].isPlayer){
			//Only want mouseclicks within the surrounding area of the player to register
			let indexOfI =board[i][j].i;
			let indexOfJ = board[i][j].j;
			for(let xoff =-1; xoff<=1;xoff++ ){
				for (let yoff = -1; yoff<=1; yoff++){
					let k = indexOfI + xoff;
					let l = indexOfJ + yoff; 
			//Have to check for neighbors only on grid
					if (k > -1&& k <column&& l >-1&& l < rows){
      					if (board[k][l].contains(mouseX, mouseY)) {
							board[k][l].reveal();
							if (board[k][l].bomb) {
								dramatic.stop();
								boom.play();
          						gameOver();
							}
							if (board[k][l].isGoal){
								//win();
							}
							board[k][l].movePlayer(board[i][j]);
						}
					}
				}
			}
		}
	}
 }
}

function draw() {
  background(0);
  
  //Show off the game board by calling the cells display() method; 
  for (let i =0; i< column; i++){
    for (let j = 0 ; j< rows; j++){
    board[i][j].display();
    }
  }
   for (let i =0; i< column; i++){
    for (let j = 0 ; j< rows; j++){
    if (board[i][j].isPlayer|| board[i][j].isGoal){
		board[i][j].reveal(); 
		}
    }
  }
}


function gameOver(){
  for (var i = 0; i < column; i++) {
    for (var j = 0; j < rows; j++) {
      board[i][j].reveal();
    }
  }
}

function create2dArray(column, rows){
  let arr = new Array(column);
  for (let i = 0; i< arr.length; i++){
    arr[i] =new Array(rows); 
  }
	return arr;
}


