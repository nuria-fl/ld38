module.exports = function () {
  // this.sinnerText.visible = false
  // this.lumberjackText.visible = false
  this.helpText.visible = false
  this._handleCollisions()
  this._handleInput()

  if (this.lumberjack.isDead && this.sinner.isDead) {
    setTimeout(() => {
      this.game.state.start('end', false, false, 'evil')
    }, 2000)
  }

  if (this.lumberjack.isHappy && this.sinner.isHappy) {
    setTimeout(() => {
      this.game.state.start('end', false, false, 'awesome')
    }, 2000)
  }

  if ((this.lumberjack.isHappy && this.sinner.isDead) ||
     (this.lumberjack.isDead && this.sinner.isHappy)) {
       setTimeout(() => {
         this.game.state.start('end', false, false, 'regular')
       }, 2000)
  }
}
