function Sinner (game, x, y) {
  // call Phaser.Sprite constructor
  Phaser.Sprite.call(this, game, x, y, 'sinner')
  this.anchor.set(0.5, 0.5)

  this.game.physics.enable(this)
  this.body.collideWorldBounds = true
}

// inherit from Phaser.Sprite
Sinner.prototype = Object.create(Phaser.Sprite.prototype)
Sinner.prototype.constructor = Sinner

module.exports = Sinner
