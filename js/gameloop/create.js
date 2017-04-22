module.exports = function () {
  this.game.add.image(0, 0, 'background')

  this.camera.flash('0x000000')

  this.world.setBounds(0, 0, 960, 1800)
  this._loadLevel()
}
