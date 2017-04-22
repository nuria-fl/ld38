module.exports = function () {
  this._handleCollisions()
  this._handleInput()

  if(this.lumberjack.isDead && this.sinner.isDead) {
    console.log('end game with evil god status');
  }
}
