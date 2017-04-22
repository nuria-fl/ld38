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

  this.mountain = this.bgDecoration.create(100, 1220, 'mountain');
  this.game.physics.enable(this.mountain);
  this.mountain.body.allowGravity = false;
  this.mountain.body.immovable = true;

  this.snow = this.bgDecoration.create(300, 1220, 'snow');
  this.game.physics.enable(this.snow);
  this.snow.body.allowGravity = false;
  this.snow.body.immovable = true;

  this.world = this.bgDecoration.create(10, 1560, 'world');
  this.game.physics.enable(this.world);
  this.world.body.allowGravity = false;
  this.world.body.immovable = true;

  this.water = this.bgDecoration.create(348, 1567, 'water');
  this.game.physics.enable(this.water);
  this.water.body.allowGravity = false;
  this.water.body.immovable = true;
  this.water.visible = false;

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

  // surrounding characters areas
  this.game.physics.arcade.overlap(this.god, this.sinnerArea, () => {
    if(!this.sinner.isDead) {
      console.log('god vs sinner');
    }
  });
  this.game.physics.arcade.overlap(this.god, this.lumberjackArea,  () => {
    if(!this.lumberjack.isDead) {
      console.log('god vs lumberjack');
    }
  });

  // bullets
  this.game.physics.arcade.collide(this.wrath.bullets, this.lumberjack, this.onBulletVsCharacter, null, this);
  this.game.physics.arcade.collide(this.wrath.bullets, this.cat,  this.onBulletVsCharacter, null, this);
  this.game.physics.arcade.collide(this.wrath.bullets, this.sinner,  this.onBulletVsCharacter, null, this);

  // melt snow
  this.game.physics.arcade.collide(this.wrath.bullets, this.snow,  this.onBulletVsSnow, null, this);


  this.game.physics.arcade.collide(this.axe, this.world)

  this.game.physics.arcade.collide(this.god, this.axe,  this.onGodVsAxe, null, this)

  // cut down tree
  this.game.physics.arcade.overlap(this.god, this.tree, this.onGodVsTree, null, this);
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
  this.lumberjack = new Lumberjack(this.game, 850, 1500)
  this.game.add.existing(this.lumberjack)

  // spawn sinner
  this.sinner = new Sinner(this.game, 350, 900)
  this.game.add.existing(this.sinner)

  // spawn god
  this.god = new God(this.game, 450, 1500)
  this.game.add.existing(this.god)
  this.camera.follow(this.god)
  this.god.body.allowGravity = false
}

PlayState._spawnCharacterAreas = function() {
  this.sinnerArea = this.bgDecoration.create(350, 950, 'interactArea')
  this.sinnerArea.anchor.set(0.5, 0.5)
  this.game.physics.enable(this.sinnerArea);
  this.sinnerArea.body.immovable = true;
  this.sinnerArea.body.allowGravity = false;

  this.lumberjackArea = this.bgDecoration.create(850, 1500, 'interactArea');
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

PlayState._spawnAxe = function() {
  this.axe = this.bgDecoration.create(850, 1500, 'axe')
  this.game.physics.enable(this.axe);


}

PlayState.onBulletVsCharacter = function(character, bullet){
  character.isDead = true
  character.kill()
  bullet.kill()
  if(this.lumberjack.isDead) {
    this._spawnAxe()
  }
}

PlayState.onBulletVsSnow = function(character, bullet){
  this.onBulletVsCharacter(character, bullet)

  this.water.visible = true
  if(!this.lumberjack.isDead) {
    this.lumberjack.goFish()
    this._spawnAxe()
  }
}

PlayState.onGodVsAxe = function(god, axe){
  god.hasAxe = true
  axe.kill()
}

PlayState.onGodVsTree = function(god, tree) {
    if(god.hasAxe) {
      this.keys.action.onDown.add(function(){
        this.tree.kill()
        this.sinner.isHappy = true
      }, this)
    }
}

// load

window.onload = function () {
  let game = new Phaser.Game(960, 600, Phaser.AUTO, 'game')
  game.state.add('play', PlayState)
  game.state.start('play', true, false, {level: 0})
}
