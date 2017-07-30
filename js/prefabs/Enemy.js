var GalacticDefender = GalacticDefender || {};

GalacticDefender.Enemy = function (game, x, y, key, health, enemyLasers) {
	Phaser.Sprite.call(this, game, x, y, key);

	this.game = game;
	// The below line can be removed
	this.game.physics.arcade.enable(this);
	this.anchor.setTo(0.5);
	this.scale.setTo(0.6);
	this.health = health;
	this.enemyLasers = enemyLasers;

	this.enemyTimer = this.game.time.create(false);
	this.enemyTimer.start();
	this.scheduleShooting();
};
GalacticDefender.Enemy.prototype = Object.create(Phaser.Sprite.prototype);
GalacticDefender.Enemy.prototype.constuctor = GalacticDefender.Enemy;

GalacticDefender.Enemy.prototype.update = function () {
	if (this.y < 0.10 * this.game.world.height) {
		this.y = 0.10 * this.game.world.height + 2;
		this.body.velocity.y *= -1;
	}
	else if (this.y > 0.90 * this.game.world.height) {
		this.y = 0.90 * this.game.world.height - 2;
		this.body.velocity.y *= -1;
	}

	// correct this (if wrong)
	if (this.top > this.game.world.width) {
		this.kill();
	}
};

GalacticDefender.Enemy.prototype.damage = function (amount) {
	Phaser.Sprite.prototype.damage.call(this, amount);

	// Particle explosion
	if (this.health <= 0) {
		var emitter = this.game.add.emitter(this.x, this.y, 100);
		emitter.makeParticles('particle');
		emitter.minParticleSpeed.setTo(-200,-200);
		emitter.maxParticleSpeed.setTo(200,200);
		emitter.minParticleScale = .05;
		emitter.maxParticleScale = .2;
		emitter.gravity = 0;
		emitter.start(true, 500, null, 100);
	}
};

GalacticDefender.Enemy.prototype.scheduleShooting = function () {
	this.shoot();
	// Can be used with a custom frequency
	this.enemyTimer.add(Phaser.Timer.SECOND * 2, this.scheduleShooting, this);
};
GalacticDefender.Enemy.prototype.shoot = function () {
	var enemyLaser = this.enemyLasers.getFirstExists(false);
	if (!enemyLaser) {
		enemyLaser = new GalacticDefender.EnemyLaser(this.game, this.x, this.bottom);
		this.enemyLasers.add(enemyLaser);
	} else {
		enemyLaser.reset(this.x, this.bottom);
	}
	enemyLaser.body.velocity.x = -100;
};