var GalacticDefender = GalacticDefender || {};

GalacticDefender.GameState = {
	init: function () {
		this.PLAYER_SPEED = 200;
		this.LASER_SPEED = 800;
		this.LASER_INTERVAL = 5;
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

		// obstacle = game.add.sprite(610, 180, 'obstacle');
		// obstacle.anchor.setTo(0.5);
	},
	update: function () {
		// obstacle.angle -= 5;
		// // obstacle.x -= 1;
		// Player laser and enemy
		this.game.physics.arcade.overlap(this.lasers, this.enemies, this.damageEnemy, null, this);

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
		var enemy = new GalacticDefender.Enemy(this.game, 550, 100, 'enemyRed', 10, []);
		this.enemies.add(enemy);
		enemy.body.velocity.x = -50;
		enemy.body.velocity.y = 100;
	},
	damageEnemy: function (laser, enemy) {
		enemy.damage(1);
		laser.kill();
	}
};