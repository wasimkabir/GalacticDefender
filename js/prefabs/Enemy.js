var GalacticDefender = GalacticDefender || {};

GalacticDefender.Enemy = function (game, x, y, key, health, enemyLaser) {
	Phaser.Sprite.call(this, game, x, y, key);

	this.game = game;
	// The below line can be removed
	this.game.physics.arcade.enable(this);
	this.anchor.setTo(0.5);
	this.scale.setTo(0.6);
	this.health = health;
	this.enemyLaser = enemyLaser;
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
}