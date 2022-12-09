// JavaScript Document

//THE CELL CLASS
class Cell{
	constructor(i,j,w, isPlayer=false, isGoal = false ){
		this.isGoal = isGoal;
		this.isPlayer = isPlayer; 
		this.isReveal = false;
		//This is how bombs are created, and make sure the player and goal dont have bombs on them
		//That would be cheating
		if (random(1)<1/4 && this.isPlayer ==false &&this.isGoal ==false){
		this.bomb =true; 	
		}
		else {
			this.bomb=false;
		}
		this.i = i;
		this.j = j; 
		this.x  =i*w; 
		this.y = j*w;
		this.w = w; 
		this.bombNumb = 0;
}
//Prototyping display method for cells
//act differently based off of if the cell is a player, a bomb, or the door
display(){
	stroke(255);
	fill(0);
	rect(this.x, this.y, this.w, this.w);
	if(this.isReveal){ // if this is close to a player
		if(this.bomb){
			ellipse(this.x+this.w*0.5, this.y+this.w*.5, w*.5);
		}
		//Indicator of how many bombs are nearby
		else if(this.isPlayer){
			textAlign(CENTER);
			fill(255);
			text(this.bombNumb, this.x+this.w*.35, this.y+this.w*.3, this.w*.5);
		}	
		//the door/ goal/exit
		else if (this.isGoal){
			rect(this.x+this.w*0.25, this.y+this.w*.25, w*.5, w*.5);
		}
	}
}
	//Moves player to selected spot
movePlayer(aCell){
	aCell.isPlayer =false;
	this.isPlayer = true;
}
// Used for figuring out the correct cell that the mouse has selected
contains(x, y) {
  return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
}

	//reveals, used in conjuction with the mouseClicked(). 
reveal() {
  this.isReveal = true;
}
//count the neighboring bombs, used for navigation for player
countBomb(){
	if (this.bomb){
		return -1;
	}
	let bombCount = 0;
	//checking around the cell's proximity
	for(let i =-1; i<=1;i++ ){
		for (let j = -1; j<=1; j++){
			let k = this.i + i;
			let l = this.j + j; 
			//Have to check for neighbors ponly on grid
			if (k > -1&& k <column&& l >-1&& l < rows){
				let neighbor = board[k][l];	
				if (neighbor.bomb){
					bombCount++;
				}
			}
		}
	}
	this.bombNumb =  bombCount;
}
};
