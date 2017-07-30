var GalacticDefender = GalacticDefender || {};

GalacticDefender.PreloadState = {
	preload: function () {
		this.load.image('playerShip', 'assets/playerShip3_red.png');
		this.load.image('laserRed1', 'assets/laserRed07.png');
		this.load.image('enemyRed', 'assets/enemyRed1.png');
		this.load.image('obstacle', 'assets/obstacle.png');
		this.load.image('starField', 'assets/starfield_2.png');
	},
	create: function () {
		this.game.state.start('GameState');
	}
};