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
  this.bgDecoration = this.game.add.group();

  this.world = this.bgDecoration.create(10, 1560, 'world');
  this.game.physics.enable(this.world);
  this.world.body.allowGravity = false;
  this.world.body.immovable = true;

  this.platform = this.bgDecoration.create(50, 1010, 'platform');
  this.game.physics.enable(this.platform);
  this.platform.body.allowGravity = false;
  this.platform.body.immovable = true;

  this.tree = this.bgDecoration.create(100, 700, 'tree');
  this.game.physics.enable(this.tree);

  this.cat = this.bgDecoration.create(150, 600, 'cat');
  this.game.physics.enable(this.cat);

  this._spawnCharacters()
  this._spawnWrath()
  this._spawnCharacterAreas()
}

PlayState._handleCollisions = function () {
  this.game.physics.arcade.collide(this.platform, this.sinner)
  this.game.physics.arcade.collide(this.platform, this.tree)
  this.game.physics.arcade.collide(this.platform, this.cat)
  this.game.physics.arcade.collide(this.tree, this.cat)
  this.game.physics.arcade.collide(this.lumberjack, this.world)

  this.game.physics.arcade.collide(this.god, this.sinnerArea, () => {
    if(!this.sinner.isDead) {
      console.log('god vs sinner');
    }
  });
  this.game.physics.arcade.collide(this.god, this.lumberjackArea,  () => {
    if(!this.lumberjack.isDead) {
      console.log('god vs lumberjack');
    }
  });

  this.game.physics.arcade.collide(this.wrath.bullets, this.lumberjack, this.onBulletVsCharacter, null, this);
  this.game.physics.arcade.collide(this.wrath.bullets, this.cat,  this.onBulletVsCharacter, null, this);
  this.game.physics.arcade.collide(this.wrath.bullets, this.sinner,  this.onBulletVsCharacter, null, this);
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
        direction = 960
    }

    this.wrath.fire(null, direction, this.god.position.y)
  }
}

PlayState._spawnCharacters = function () {
  // spawn lumberjack
  this.lumberjack = new Lumberjack(this.game, 750, 1500)
  this.game.add.existing(this.lumberjack)

  // spawn sinner
  this.sinner = new Sinner(this.game, 350, 900)
  this.game.add.existing(this.sinner)

  // spawn god
  this.god = new God(this.game, 450, 150)
  this.game.add.existing(this.god)
  this.camera.follow(this.god)
  this.god.body.allowGravity = false
}

PlayState._spawnCharacterAreas = function() {
  this.sinnerArea = this.game.add.sprite(350, 950, 'interactArea');
  this.sinnerArea.anchor.set(0.5, 0.5)
  this.game.physics.enable(this.sinnerArea);
  this.sinnerArea.body.immovable = true;
  this.sinnerArea.body.allowGravity = false;

  this.lumberjackArea = this.game.add.sprite(750, 1500, 'interactArea');
  this.lumberjackArea.anchor.set(0.5, 0.5)
  this.game.physics.enable(this.lumberjackArea);
  this.lumberjackArea.body.immovable = true;
  this.lumberjackArea.body.allowGravity = false;
}

PlayState._spawnWrath = function() {
  this.wrath = this.game.add.weapon(1, 'bullet')
  this.wrath.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS

  this.wrath.trackSprite(this.god, 0, 0, true)
  this.wrath.bulletSpeed = 600
  this.wrath.bulletGravity.y = -1000
}

PlayState.onBulletVsCharacter = function(character, bullet){
  character.isDead = true
  character.kill()
  bullet.kill()
}
// load

window.onload = function () {
  let game = new Phaser.Game(960, 600, Phaser.AUTO, 'game')
  game.state.add('play', PlayState)
  game.state.start('play', true, false, {level: 0})
}
