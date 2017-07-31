var GalacticDefender = GalacticDefender || {};

GalacticDefender.PreloadState = function (){};
GalacticDefender.PreloadState.prototype = {
	preload: function () {
		this.load.image('playerShip', 'assets/playerShip1_blue.png');
		this.load.image('laserRed1', 'assets/laserRed07.png');
		this.load.image('enemyLaser1', 'assets/laserRed08.png');
		this.load.image('enemyLaser2', 'assets/laserRed09.png');
		this.load.image('enemyRed', 'assets/enemyRed1.png');
		this.load.image('enemyGreen', 'assets/enemyGreen3.png');
		this.load.image('enemyBlue', 'assets/enemyBlue2.png');
		this.load.image('enemyBlack', 'assets/enemyBlack4.png');
		this.load.image('starField', 'assets/starfield_2.png');
		this.load.image('particle', 'assets/laserRed10.png');
		// Level
		this.load.text('level1', 'assets/levels/level1.json');
		this.load.text('level2', 'assets/levels/level2.json');
		this.load.text('level3', 'assets/levels/level3.json');

	},
	create: function () {
		this.game.state.start('GameState');
	}
};