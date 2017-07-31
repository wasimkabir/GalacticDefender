var GalacticDefender = GalacticDefender || {};

GalacticDefender.PreloadState = function (){};
GalacticDefender.PreloadState.prototype = {
	preload: function () {
		this.load.image('playerShip', 'assets/playerShip1_blue.png');
		this.load.image('laserRed1', 'assets/laserRed07.png');
		this.load.image('enemyLaserRed1', 'assets/laserRed08.png');
		this.load.image('enemyLaserRed2', 'assets/laserRed09.png');
		this.load.image('enemyLaserGreen', 'assets/laserGreen16.png');
		this.load.image('enemyLaserBlue1', 'assets/laserBlue11.png');
		this.load.image('enemyLaserBlue2', 'assets/laserBlue10.png');
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

		// Sounds
		this.load.audio('playerLaser', ['assets/sounds/128229__kafokafo__laser(edited).mp3', 'assets/sounds/128229__kafokafo__laser(edited).ogg']);
		this.load.audio('enemyLaser', ['assets/sounds/337112__daycraftmc__laser-5(edited).mp3', 'assets/sounds/337112__daycraftmc__laser-5(edited).ogg']);
		this.load.audio('destroy', ['assets/sounds/390362__josethehedgehog__ruptura-de-arbol(edited).mp3', 'assets/sounds/390362__josethehedgehog__ruptura-de-arbol(edited).ogg']);

	},
	create: function () {
		this.game.state.start('GameState');
	}
};