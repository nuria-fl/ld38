module.exports = function (data) {
  this.keys = this.game.input.keyboard.addKeys({
    left: Phaser.KeyCode.LEFT,
    right: Phaser.KeyCode.RIGHT,
    up: Phaser.KeyCode.UP,
    down: Phaser.KeyCode.DOWN,
    action: Phaser.KeyCode.SPACEBAR,
    wrath: Phaser.KeyCode.W
  })

  this.game.renderer.renderSession.roundPixels = true
}
