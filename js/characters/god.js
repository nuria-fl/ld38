function God (game, x, y) {
  // call Phaser.Sprite constructor
  Phaser.Sprite.call(this, game, x, y, 'god')
  this.anchor.set(0.5, 0.5)

  this.game.physics.enable(this)
  this.body.collideWorldBounds = true
}

// inherit from Phaser.Sprite
God.prototype = Object.create(Phaser.Sprite.prototype)
God.prototype.constructor = God

God.prototype.float = function (x, y) {
  this.x += x * 5
  this.y += y * 5
}

module.exports = God
