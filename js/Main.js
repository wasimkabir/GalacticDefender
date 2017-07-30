var GalacticDefender = GalacticDefender || {};

GalacticDefender.game = new Phaser.Game(640, 360, Phaser.AUTO, 'gameDiv');

GalacticDefender.game.state.add('BootState', GalacticDefender.BootState);
GalacticDefender.game.state.add('PreloadState', GalacticDefender.PreloadState);
GalacticDefender.game.state.add('GameState', GalacticDefender.GameState);

GalacticDefender.game.state.start('BootState');