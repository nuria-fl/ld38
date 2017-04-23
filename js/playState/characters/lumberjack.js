function Lumberjack (game, x, y) {
  // call Phaser.Sprite constructor
  Phaser.Sprite.call(this, game, x, y, 'lumberjack')
  this.anchor.set(0.5, 0.5)

  this.game.physics.enable(this)
  this.body.collideWorldBounds = true
}

// inherit from Phaser.Sprite
Lumberjack.prototype = Object.create(Phaser.Sprite.prototype)
Lumberjack.prototype.constructor = Lumberjack

Lumberjack.prototype.goFish = function (direction) {
  this.isHappy = true
  this.game.add.tween(this).to({ x: '-150' }, 1500, Phaser.Easing.Elastic.InOut, true)
}

module.exports = Lumberjack
