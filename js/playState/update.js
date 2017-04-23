module.exports = function () {
  this.sinnerText.visible = false
  this.lumberjackText.visible = false
  this._handleCollisions()
  this._handleInput()

  if (this.lumberjack.isDead && this.sinner.isDead) {
    this.game.state.start('end', false, false, 'evil')
  }

  if (this.lumberjack.isHappy && this.sinner.isHappy) {
    this.game.state.start('end', false, false, 'awesome')
  }

  if ((this.lumberjack.isHappy && this.sinner.isDead) ||
     (this.lumberjack.isDead && this.sinner.isHappy)) {
    this.game.state.start('end', false, false, 'regular')
  }
}
