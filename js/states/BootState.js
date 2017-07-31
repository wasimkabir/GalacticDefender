var GalacticDefender = GalacticDefender || {};

GalacticDefender.BootState = function (){};
GalacticDefender.BootState.prototype = {
	preload: function () {
		
	},
	create: function () {
		this.stage.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		this.game.state.start('PreloadState');
	}
};