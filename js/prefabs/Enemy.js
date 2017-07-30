var GalacticDefender = GalacticDefender || {};

GalacticDefender.Enemy = function (game, x, y, key, health, enemyLaser) {
	Phaser.Sprite.call(this, game, x, y, key);
	this.anchor.setTo(0.5);
	this.scale.setTo(0.6);
	this.enemyLaser = enemyLaser;
};
GalacticDefender.Enemy.prototype = Object.create(Phaser.Sprite.prototype);
GalacticDefender.Enemy.prototype.constuctor = GalacticDefender.Enemy;