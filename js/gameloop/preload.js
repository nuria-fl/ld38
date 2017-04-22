const preload = function () {
  this.game.load.image('background', 'images/background.png')
  this.game.load.image('god', 'images/god.png')
  this.game.load.image('lumberjack', 'images/lumberjack.png')
  this.game.load.image('sinner', 'images/sinner.png')
  this.game.load.image('interactArea', 'images/interactArea.png')
  this.game.load.image('bullet', 'images/bullet.png')
}

module.exports = preload
