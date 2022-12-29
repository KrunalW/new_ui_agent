var n = document.getElementById("numStats");
var ctx = n.getContext("2d");

//making the canvas full screen
n.height = window.innerHeight;
n.width = window.innerWidth;

//number characters - taken from the unicode charset
var number = "";
var newNode = document.createElement('h1');
var icn = newNode.innerHTML = "V";
console.log("hello " + icn);
//converting the string into an array of single characters
// number = number.split("");

var font_size = 14;
var columns = n.width/font_size; //number of columns for the rain
//an array of drops - one per column
var drops = [];
//x below is the x coordinate
//1 = y co-ordinate of the drop(same for every drop initially)
for(var x = 0; x < columns; x++)
	drops[x] = 1; 

//drawing the characters
function draw()
{
	//Black BG for the canvas
	//translucent BG to show trail
	ctx.fillStyle = "rgb(49 24 3 / 5%)";
	ctx.fillRect(0, 0, n.width, n.height);
	
	ctx.fillStyle = "#6e3405"; //green text
	ctx.font = font_size + "px arial";
	//looping over drops
	for(var i = 0; i < drops.length; i++)
	{
		//a random chinese character to print
		// var text = number[Math.floor(Math.random()*number.length)];
		var text = icn;
		//x = i*font_size, y = value of drops[i]*font_size
		ctx.fillText(text, i*font_size, drops[i]*font_size);
		
		//sending the drop back to the top randomly after it has crossed the screen
		//adding a randomness to the reset to make the drops scattered on the Y axis
		if(drops[i]*font_size > n.height && Math.random() > 0.975)
			drops[i] = 0;
		
		//incrementing Y coordinate
		drops[i]++;
	}
}

setInterval(draw, 80);