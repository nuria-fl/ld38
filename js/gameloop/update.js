module.exports = function () {
  this._handleCollisions()
  this._handleInput()

  if(this.lumberjack.isDead && this.sinner.isDead) {
    console.log('end game with evil god status');
  }

  if(this.lumberjack.isHappy && this.sinner.isHappy) {
    console.log('end game with awesome god status');
  }

  if((this.lumberjack.isHappy && this.sinner.isDead) ||
     (this.lumberjack.isDead && this.sinner.isHappy)) {
    console.log('end game with meh god status');
  }
}
