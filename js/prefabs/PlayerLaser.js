var GalacticDefender = GalacticDefender || {};

GalacticDefender.PlayerLaser = function (game, x, y) {
	Phaser.Sprite.call(this, game, x, y, 'laserRed1');
	this.anchor.setTo(0.5);
	this.scale.setTo(0.6);

	this.checkWorldBounds = true;
	this.outOfBoundsKill = true;
};
GalacticDefender.PlayerLaser.prototype = Object.create(Phaser.Sprite.prototype);
GalacticDefender.PlayerLaser.prototype.constructor = GalacticDefender.PlayerLaser;