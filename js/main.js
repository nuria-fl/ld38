const init = require('./gameloop/init')
const preload = require('./gameloop/preload')
const create = require('./gameloop/create')
const update = require('./gameloop/update')
const God = require('./characters/god')
const Sinner = require('./characters/sinner')
const Lumberjack = require('./characters/lumberjack')

const PlayState = {
  init,
  preload,
  create,
  update
}

// Playstate functions

PlayState._loadLevel = function (data) {
  this._spawnCharacters()
  this._spawnWrath()
  this._spawnCharacterAreas()
}

PlayState._handleCollisions = function () {
  this.game.physics.arcade.collide(this.god, this.sinnerArea, () => {
    console.log('god vs sinner');
  });
  this.game.physics.arcade.collide(this.god, this.lumberjackArea,  () => {
    console.log('god vs lumberjack');
  });
}

var facing
PlayState._handleInput = function () {
  let x = 0
  let y = 0

  if (this.keys.left.isDown) {
    x = -1
    facing = 'left'
  }
  else if (this.keys.right.isDown) {
    x = 1
    facing = 'right'
  }

  if (this.keys.up.isDown) {
    y = -1
  }
  else if (this.keys.down.isDown) {
    y = 1
  }
  this.god.float(x, y)

  if (this.keys.wrath.isDown) {
    let direction = 0
    if (facing === 'right') {
        direction = -1
    }

    this.wrath.fire(null, direction, this.god.position.y)
  }
}

PlayState._spawnCharacters = function () {
  // spawn god
  this.god = new God(this.game, 450, 150)
  this.game.add.existing(this.god)
  this.camera.follow(this.god)

  // spawn lumberjack
  this.lumberjack = new Lumberjack(this.game, 750, 1700)
  this.game.add.existing(this.lumberjack)

  // spawn sinner
  this.sinner = new Sinner(this.game, 150, 900)
  this.game.add.existing(this.sinner)
}

PlayState._spawnCharacterAreas = function() {
  this.sinnerArea = this.game.add.sprite(150, 900, 'interactArea');
  this.sinnerArea.anchor.set(0.5, 0.5)
  this.game.physics.enable(this.sinnerArea);
  this.sinnerArea.body.immovable = true;

  this.lumberjackArea = this.game.add.sprite(750, 1700, 'interactArea');
  this.lumberjackArea.anchor.set(0.5, 0.5)
  this.game.physics.enable(this.lumberjackArea);
  this.lumberjackArea.body.immovable = true;
}

PlayState._spawnWrath = function() {
  this.wrath = this.game.add.weapon(1, 'bullet')
  this.wrath.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS

  this.wrath.trackSprite(this.god, 0, 0, true)
  this.wrath.bulletSpeed = 600;

}
// load

window.onload = function () {
  let game = new Phaser.Game(960, 600, Phaser.AUTO, 'game')
  game.state.add('play', PlayState)
  game.state.start('play', true, false, {level: 0})
}
