var GalacticDefender = GalacticDefender || {};

GalacticDefender.BootState = {
	init: function () {
		
	},
	create: function () {
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		this.game.state.start('PreloadState');
	}
};