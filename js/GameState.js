var GalacticDefender = GalacticDefender || {};

GalacticDefender.GameState = function (){};
GalacticDefender.GameState.prototype = {
	init: function (currentLevel) {
		this.PLAYER_SPEED = 200;
		this.LASER_SPEED = 800;
		this.LASER_INTERVAL = 5;

		this.numLevels = 3;
		this.currentLevel = currentLevel ? currentLevel : 1;

		console.log('currentLevel: ' + this.currentLevel);
	},
	create: function () {
		// // game.stage.backgroundColor = "#082451";
		this.starField = this.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'starField');
		this.starField.autoScroll(-30, 0);

		//Sprites
		this.playerShip = this.add.sprite(30, 180, 'playerShip');
		this.playerShip.anchor.setTo(0.5);
		this.playerShip.scale.setTo(0.6);
		this.game.physics.arcade.enable(this.playerShip);
		this.playerShip.body.collideWorldBounds = true;
		//Lasers
		this.initLasers();
		this.shootingTimer = this.game.time.events.loop(Phaser.Timer.SECOND/this.LASER_INTERVAL, this.createPlayerLaser, this);

		this.initEnemies();

		// Load the level
		this.loadLevel();

		// obstacle = game.add.sprite(610, 180, 'obstacle');
		// obstacle.anchor.setTo(0.5);
	},
	update: function () {
		// obstacle.angle -= 5;
		// // obstacle.x -= 1;
		// Player laser and enemy
		this.game.physics.arcade.overlap(this.lasers, this.enemies, this.damageEnemy, null, this);
		this.game.physics.arcade.overlap(this.enemyLasers, this.playerShip, this.killlPlayerShip, null, this);

		this.playerShip.body.velocity.y = 0;
		if (this.game.input.activePointer.isDown) {
			// Modify this code
			var targetY = this.game.input.activePointer.position.y;
			var direction = targetY >= this.game.world.centerY ? 1 : -1;

			this.playerShip.body.velocity.y = direction * this.PLAYER_SPEED;
		}
	},
	//initLasers
	initLasers: function () {
		this.lasers = this.add.group();
		this.lasers.enableBody = true;
	},
	createPlayerLaser: function () {
		var laser = this.lasers.getFirstExists(false);
		if(!laser) {
			// Creating a laser
			laser = new GalacticDefender.PlayerLaser(this.game, this.playerShip.x, this.playerShip.y);
			this.lasers.add(laser);
		} else {
			// Reset position
			laser.reset(this.playerShip.x, this.playerShip.y);
		}
		// Set velocity
		laser.body.velocity.x = this.LASER_SPEED;
	},
	initEnemies: function () {
		this.enemies = this.add.group();
		this.enemies.enableBody = true;

		this.enemyLasers = this.add.group();
		this.enemyLasers.enableBody = true;

		// this.enemy = new GalacticDefender.Enemy(this.game, 550, 100, 'enemyRed', 10, this.enemyLasers);
		// this.enemies.add(this.enemy);
		// this.enemy.body.velocity.x = -50;
		// this.enemy.body.velocity.y = 100;
	},
	damageEnemy: function (laser, enemy) {
		enemy.damage(1);
		laser.kill();
	},
	killlPlayerShip: function () {
		this.playerShip.kill();
		this.game.state.start('GameState');
	},

	createEnemy: function (x, y, health, key, scale, speedX, speedY) {
		var enemy = this.enemies.getFirstExists(false);
		if (!enemy) {
			enemy = new GalacticDefender.Enemy(this.game, x, y, key, health, this.enemyLasers);
			this.enemies.add(enemy);
		}
		enemy.reset(x, y, health, key, scale, speedX, speedY);
	},
	loadLevel: function () {
		this.currentEnemyIndex = 0;

		this.levelData = JSON.parse(this.game.cache.getText('level' + this.currentLevel));

		// End of the level timer
		this.endOfTimer = this.game.time.events.add(this.levelData.duration * 1000, function(){
				console.log('level ended');
			if (this.currentLevel < this.numLevels) {
				this.currentLevel++;
			} else {
				// Modify this
				this.currentLevel = 1;
			}

			this.game.state.start('GameState', true, false, this.currentLevel);
		}, this);
		this.scheduleNextEnemy();
	},
	scheduleNextEnemy: function() {
		var nextEnemy = this.levelData.enemies[this.currentEnemyIndex];
		if (nextEnemy) {
			var nextTime = 1000 * (nextEnemy.time - (this.currentEnemyIndex == 0 ? 0 : this.levelData.enemies[this.currentEnemyIndex - 1].time));
			this.nextEnemyTimer = this.game.time.events.add(nextTime, function(){
				this.createEnemy(550, nextEnemy.y * this.game.world.height, nextEnemy.health, nextEnemy.key, nextEnemy.scale, -nextEnemy.speedX, nextEnemy.speedY)
				this.currentEnemyIndex++;
				this.scheduleNextEnemy();
			}, this);
		}
	}
};