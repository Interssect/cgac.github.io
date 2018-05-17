// Game completion modal
var youWin = "You Win!";
// Enemies, axis, speed and image
var Enemy = function(x, y, speed) {
	this.x = x;
	this.y = y;
	this.speed = speed;
	this.sprite = 'images/enemy-Bill.png';
};
// Updates the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	this.x += this.speed * dt;
	if (this.x > 510) {
		this.x = -50;
		this.speed = 100 + Math.floor(Math.random() * 222);
	};
	if (player.x < this.x + 80 && player.x + 80 > this.x && player.y < this.y + 60 && 60 + player.y > this.y) {
		player.x = 202;
		player.y = 405;
	};
};
// Rendering the enemy
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Player, axis and image
var Player = function(x, y) {
	this.x = x;
	this.y = y;
	this.player = 'images/super-Mario.png';
};
Player.prototype.update = function(dt) {};
Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.player), this.x, this.y);
};
// Enables user to move (navigate) through the game by the y and x axis
Player.prototype.handleInput = function(keyPress) {
	if (keyPress == 'left' && this.x > 0) {
		this.x -= 102;
	};
	if (keyPress == 'right' && this.x < 405) {
		this.x += 102;
	};
	if (keyPress == 'up' && this.y > 0) {
		this.y -= 83;
	};
	if (keyPress == 'down' && this.y < 405) {
		this.y += 83;
	};
	
	// When the player reaches the top of the game (the pipes), user is reset to the start position
	//The modal (You Win!) apears and shortly after (Play Again!) apears
    if (this.y < 0) {
        setTimeout(() => {
            this.x = 202;
            this.y = 405;
        }, 800);
		$('.youWin span').html(youWin).delay(2000).queue(function() {
			$('.youWin span').html("Play Again!");
		});
	}
};
// Enemies are in the array
var allEnemies = [];
// Enemy locations
var enemyLocation = [63, 147, 230];
// Enemy speed and location 
enemyLocation.forEach(function(locationY) {
	enemy = new Enemy(0, locationY, 200);
	allEnemies.push(enemy);
});
// Adds sound effects to a key press, (jumping sound)
document.addEventListener('keydown', function(e) {
	if (e.keyCode == 37, 38, 39, 40) {
		document.getElementById('audio').play();
	}
});
// Starting position of a player
var player = new Player(202, 405);
// Navigation keys of a player
document.addEventListener('keyup', function(e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};
	player.handleInput(allowedKeys[e.keyCode]);
});