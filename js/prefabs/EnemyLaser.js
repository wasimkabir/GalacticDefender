var GalacticDefender = GalacticDefender || {};
GalacticDefender.EnemyLaser = function (game, x, y) {
	Phaser.Sprite.call(this, game, x, y, 'enemyLaser1');
	this.anchor.setTo(0.5);
	this.scale.setTo(0.5);

	this.checkWorldBounds = true;
	this.outOfBoundsKill = true;
};
GalacticDefender.EnemyLaser.prototype = Object.create(Phaser.Sprite.prototype);
GalacticDefender.EnemyLaser.prototype.constructor = GalacticDefender.EnemyLaser;

GalacticDefender.EnemyLaser.prototype.update = function () {
	this.angle -= 5;
}