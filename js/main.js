const init = require('./gameloop/init')
const preload = require('./gameloop/preload')
const create = require('./gameloop/create')
const update = require('./gameloop/update')
const God = require('./characters/god')

const PlayState = {
  init,
  preload,
  create,
  update
}

// Playstate functions

PlayState._loadLevel = function (data) {
  this._spawnCharacters()
}

PlayState._handleCollisions = function () {
  // this.game.physics.arcade.collide();
}

PlayState._handleInput = function () {
  let x = 0
  let y = 0

  if (this.keys.left.isDown) {
    x = -1
  }
  else if (this.keys.right.isDown) {
    x = 1
  }

  if (this.keys.up.isDown) {
    y = -1
  }
  else if (this.keys.down.isDown) {
    y = 1
  }
  this.god.float(x, y)
}

PlayState._spawnCharacters = function (data) {
    // spawn god
  this.god = new God(this.game, 150, 150)
  this.game.add.existing(this.god)
  this.camera.follow(this.god)
}

// load

window.onload = function () {
  let game = new Phaser.Game(960, 600, Phaser.AUTO, 'game')
  game.state.add('play', PlayState)
  game.state.start('play', true, false, {level: 0})
}
