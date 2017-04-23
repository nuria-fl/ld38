const preload = function () {
  this.game.load.image('background', 'assets/images/background.png')
  this.game.load.image('god', 'assets/images/god.png')
  this.game.load.image('lumberjack', 'assets/images/lumberjack.png')
  this.game.load.image('sinner', 'assets/images/sinner.png')
  this.game.load.image('interactArea', 'assets/images/interactArea.png')
  this.game.load.image('bullet', 'assets/images/bullet.png')
  this.game.load.image('platform', 'assets/images/platform.png')
  this.game.load.image('tree', 'assets/images/tree.png')
  this.game.load.image('cat', 'assets/images/cat.png')
  this.game.load.image('world', 'assets/images/world.png')
  this.game.load.image('mountain', 'assets/images/mountain.png')
  this.game.load.image('snow', 'assets/images/snow.png')
  this.game.load.image('water', 'assets/images/water.png')
  this.game.load.image('axe', 'assets/images/axe.png')

  this.game.load.audio('sfx:chop', 'assets/sound/chop.wav')
  this.game.load.audio('sfx:death', 'assets/sound/death.wav')
  this.game.load.audio('sfx:got', 'assets/sound/got.wav')
  this.game.load.audio('sfx:wrath', 'assets/sound/wrath.wav')

}

module.exports = preload
