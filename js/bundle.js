(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

// Endstate
module.exports = {
  preload: function preload() {
    this.game.load.spritesheet('button', 'assets/images/button.png', 244, 59);
  },
  init: function init(score) {
    this.game.score = score;
  },

  create: function create() {
    var textStyle = {
      font: '40px Amatica SC',
      fill: '#58a4b0',
      fontWeight: 'bold',
      boundsAlignH: 'center',
      boundsAlignV: 'middle'
    };

    var gameOver = this.game.add.text(0, 0, ' Game Over ', Object.assign({}, textStyle, {
      font: '80px Amatica SC'
    }));
    // gameOver.setShadow(-2, 2, '#000', 0)
    gameOver.setTextBounds(0, 150, 960, 100);

    var scoreTextContent = {
      line1: '',
      line2: ''
    };

    if (this.game.score === 'evil') {
      scoreTextContent.line1 = 'You are a cruel god.';
      scoreTextContent.line2 = 'There\'s no one left to worship you.';
    } else if (this.game.score === 'awesome') {
      scoreTextContent.line1 = 'You are a benign god.';
      scoreTextContent.line2 = 'Your tiny world will flourish.';
    } else {
      scoreTextContent.line1 = 'You are a strange god.';
      scoreTextContent.line2 = 'Your believers don\'t know what to expect of you';
    }

    var scoreTextLine1 = this.game.add.text(0, 0, scoreTextContent.line1, textStyle);
    // scoreTextLine1.setShadow(-2, 2, '#000', 0)
    scoreTextLine1.setTextBounds(0, 250, 960, 100);

    var scoreTextLine2 = this.game.add.text(0, 0, scoreTextContent.line2, textStyle);
    // scoreTextLine2.setShadow(-2, 2, '#000', 0)
    scoreTextLine2.setTextBounds(0, 300, 960, 100);

    var button = this.game.add.button(480, 450, 'button', this.startOver, this, 1, 0);
    button.anchor.set(0.5, 0.5);
  },

  startOver: function startOver() {
    this.game.state.start('play', true, false);
  }
};

},{}],2:[function(require,module,exports){
'use strict';

var PlayState = require('./playState');
var EndState = require('./endState');

// load
function start() {
  document.getElementById('startScreen').style.display = 'none';

  var game = new Phaser.Game(960, 600, Phaser.AUTO, 'game');

  game.state.add('play', PlayState);
  game.state.add('end', EndState);

  game.state.start('play', true, false);
}

window.onload = function () {
  document.getElementById('play').addEventListener('click', function (e) {
    e.preventDefault();
    start();
  });
};

},{"./endState":1,"./playState":7}],3:[function(require,module,exports){
'use strict';

function God(game, x, y) {
  // call Phaser.Sprite constructor
  Phaser.Sprite.call(this, game, x, y, 'god');
  this.anchor.set(0.5, 0.5);

  this.animations.add('left', [0]);
  this.animations.add('right', [1]);

  this.facing = 'left';

  this.game.physics.enable(this);
  this.body.collideWorldBounds = true;
}

// inherit from Phaser.Sprite
God.prototype = Object.create(Phaser.Sprite.prototype);
God.prototype.constructor = God;

God.prototype.float = function (x, y) {
  this.x += x * 5;
  this.y += y * 5;
};

God.prototype._getAnimationName = function () {

  if (this.facing === 'right') {
    return 'right';
  } else {
    return 'left';
  }

  return name;
};

God.prototype.update = function () {
  var animationName = this._getAnimationName();

  if (this.animations.name !== animationName) {
    this.animations.play(animationName);
  }
};

module.exports = God;

},{}],4:[function(require,module,exports){
'use strict';

function Lumberjack(game, x, y) {
  // call Phaser.Sprite constructor
  Phaser.Sprite.call(this, game, x, y, 'lumberjack');
  this.anchor.set(0.5, 0.5);

  this.animations.add('stop', [0]);
  this.animations.add('go', [1]);
  this.animations.add('fishing', [2]);

  this.game.physics.enable(this);
  this.body.collideWorldBounds = true;
}

// inherit from Phaser.Sprite
Lumberjack.prototype = Object.create(Phaser.Sprite.prototype);
Lumberjack.prototype.constructor = Lumberjack;

Lumberjack.prototype.goFish = function (direction) {
  var _this = this;

  this.animations.play('go');

  var tween = this.game.add.tween(this).to({ x: '-160' }, 1500, Phaser.Easing.Elastic.InOut, true);

  tween.onComplete.add(function () {
    _this.animations.play('fishing');
    _this.isHappy = true;
  });
};

module.exports = Lumberjack;

},{}],5:[function(require,module,exports){
'use strict';

function Sinner(game, x, y) {
  // call Phaser.Sprite constructor
  Phaser.Sprite.call(this, game, x, y, 'sinner');
  this.anchor.set(0.5, 0.5);

  this.game.physics.enable(this);
  this.body.collideWorldBounds = true;
}

// inherit from Phaser.Sprite
Sinner.prototype = Object.create(Phaser.Sprite.prototype);
Sinner.prototype.constructor = Sinner;

module.exports = Sinner;

},{}],6:[function(require,module,exports){
'use strict';

module.exports = function () {
  this.game.add.image(0, 0, 'background');

  this.sfx = {
    chop: this.game.add.audio('sfx:chop'),
    death: this.game.add.audio('sfx:death'),
    got: this.game.add.audio('sfx:got'),
    wrath: this.game.add.audio('sfx:wrath')
  };

  this.camera.flash('0x000000');

  this.world.setBounds(0, 0, 960, 1800);
  this._loadLevel();
};

},{}],7:[function(require,module,exports){
'use strict';

var init = require('./init');
var preload = require('./preload');
var create = require('./create');
var update = require('./update');
var methods = require('./methods');

var PlayState = Object.assign({}, {
  init: init,
  preload: preload,
  create: create,
  update: update
}, methods);

module.exports = PlayState;

},{"./create":6,"./init":8,"./methods":9,"./preload":10,"./update":11}],8:[function(require,module,exports){
"use strict";

module.exports = function (data) {
  this.keys = this.game.input.keyboard.addKeys({
    left: Phaser.KeyCode.LEFT,
    right: Phaser.KeyCode.RIGHT,
    up: Phaser.KeyCode.UP,
    down: Phaser.KeyCode.DOWN,
    action: Phaser.KeyCode.SPACEBAR,
    wrath: Phaser.KeyCode.W
  });

  this.game.renderer.renderSession.roundPixels = true;

  this.game.physics.arcade.gravity.y = 1000;
};

},{}],9:[function(require,module,exports){
'use strict';

var God = require('./characters/god');
var Sinner = require('./characters/sinner');
var Lumberjack = require('./characters/lumberjack');

// Playstate functions
var PlayState = {};

PlayState._loadLevel = function (data) {
  this.bgDecoration = this.game.add.group();

  this.mountain = this.bgDecoration.create(100, 1278, 'mountain');
  this.game.physics.enable(this.mountain);
  this.mountain.body.allowGravity = false;
  this.mountain.body.immovable = true;

  this.snow = this.bgDecoration.create(340, 1273, 'snow');
  this.game.physics.enable(this.snow);
  this.snow.body.allowGravity = false;
  this.snow.body.immovable = true;

  this.world = this.bgDecoration.create(10, 1560, 'world');
  this.game.physics.enable(this.world);
  this.world.body.allowGravity = false;
  this.world.body.immovable = true;

  this.water = this.bgDecoration.create(355, 1566, 'water');
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

  this._spawnCharacters();
  this._spawnWrath();
  this._spawnCharacterAreas();
  this._spawnText();
};

PlayState._handleCollisions = function () {
  var _this2 = this;

  this.game.physics.arcade.collide(this.platform, this.sinner);
  this.game.physics.arcade.collide(this.platform, this.tree);
  this.game.physics.arcade.collide(this.platform, this.cat);
  this.game.physics.arcade.collide(this.tree, this.cat);
  this.game.physics.arcade.collide(this.lumberjack, this.world);

  // surrounding characters areas
  this.game.physics.arcade.overlap(this.god, this.sinnerArea, function () {
    if (!_this2.sinner.isDead && !_this2.sinner.isHappy) {
      _this2.sinnerText.visible = true;
    }
  });

  this.game.physics.arcade.overlap(this.god, this.lumberjackArea, function () {
    if (!_this2.lumberjack.isDead && !_this2.lumberjack.isHappy) {
      _this2.lumberjackText.visible = true;
    }
  });

  // bullets
  this.game.physics.arcade.collide(this.wrath.bullets, this.lumberjack, this.onBulletVsCharacter, null, this);
  // this.game.physics.arcade.collide(this.wrath.bullets, this.cat, this.onBulletVsCharacter, null, this)
  this.game.physics.arcade.collide(this.wrath.bullets, this.sinner, this.onBulletVsCharacter, null, this);

  // melt snow
  this.game.physics.arcade.collide(this.wrath.bullets, this.snow, this.onBulletVsSnow, null, this);

  this.game.physics.arcade.collide(this.axe, this.world);

  this.game.physics.arcade.collide(this.god, this.axe, this.onGodVsAxe, null, this);

  // cut down tree
  this.game.physics.arcade.overlap(this.god, this.tree, this.onGodVsTree, null, this);
};

PlayState._handleInput = function () {
  var x = 0;
  var y = 0;

  if (this.keys.left.isDown) {
    x = -1;
    this.god.facing = 'left';
  } else if (this.keys.right.isDown) {
    x = 1;
    this.god.facing = 'right';
  }

  if (this.keys.up.isDown) {
    y = -1;
  } else if (this.keys.down.isDown) {
    y = 1;
  }
  this.god.float(x, y);

  if (this.keys.wrath.isDown) {
    var direction = 0;
    if (this.god.facing === 'right') {
      direction = 960;
    }

    var fire = this.wrath.fire(null, direction, this.god.position.y);
    if (fire) {
      this.sfx.wrath.play();
    }
  }
};

PlayState._spawnCharacters = function () {
  // spawn lumberjack
  this.lumberjack = new Lumberjack(this.game, 850, 1500);
  this.game.add.existing(this.lumberjack);

  // spawn sinner
  this.sinner = new Sinner(this.game, 350, 900);
  this.game.add.existing(this.sinner);

  // spawn god
  this.god = new God(this.game, 450, 150);
  this.game.add.existing(this.god);
  this.camera.follow(this.god);
  this.god.body.allowGravity = false;
};

PlayState._spawnCharacterAreas = function () {
  this.sinnerArea = this.bgDecoration.create(350, 950, 'interactArea');
  this.sinnerArea.anchor.set(0.5, 0.5);
  this.game.physics.enable(this.sinnerArea);
  this.sinnerArea.body.immovable = true;
  this.sinnerArea.body.allowGravity = false;

  this.lumberjackArea = this.bgDecoration.create(850, 1500, 'interactArea');
  this.lumberjackArea.anchor.set(0.5, 0.5);
  this.game.physics.enable(this.lumberjackArea);
  this.lumberjackArea.body.immovable = true;
  this.lumberjackArea.body.allowGravity = false;
};

PlayState._spawnText = function (data) {
  var textStyle = {
    font: '30px Amatica SC',
    fill: '#58a4b0',
    fontWeight: 'bold',
    boundsAlignH: 'center',
    boundsAlignV: 'middle'
  };

  var texts = {
    sinner: 'Oh god, my cat is in that tree\nand I can\'t get her down!',
    lumberjack: 'Oh god, I don\'t wanna be \na lumberjack anymore,\nthere are no trees!\n I want to be a fisherman,\nbut there\'s no water either!'
  };
  this.sinnerText = this.game.add.text(0, 0, texts.sinner, textStyle);
  this.lumberjackText = this.game.add.text(0, 0, texts.lumberjack, textStyle);

  this.sinnerText.setTextBounds(150, 700, 600, 200);
  this.sinnerText.lineSpacing = 1;
  this.sinnerText.visible = false;

  this.lumberjackText.setTextBounds(500, 1150, 600, 300);
  this.lumberjackText.lineSpacing = 1;
  this.lumberjackText.visible = false;
};

PlayState._spawnWrath = function () {
  this.wrath = this.game.add.weapon(1, 'bullet');
  this.wrath.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

  this.wrath.trackSprite(this.god, 0, 0, true);
  this.wrath.bulletSpeed = 600;
  this.wrath.bulletGravity.y = -1000;
};

PlayState._spawnAxe = function () {
  this.axe = this.bgDecoration.create(850, 1500, 'axe');
  this.game.physics.enable(this.axe);
};

PlayState.onBulletVsCharacter = function (character, bullet) {
  character.isDead = true;
  character.kill();
  bullet.kill();
  this.sfx.death.play();
  if (this.lumberjack.isDead) {
    this._spawnAxe();
  }
};

PlayState.onBulletVsSnow = function (character, bullet) {
  this.onBulletVsCharacter(character, bullet);

  this.water.visible = true;
  if (!this.lumberjack.isDead) {
    this.lumberjack.goFish();
    this._spawnAxe();
  }
};

PlayState.onGodVsAxe = function (god, axe) {
  god.hasAxe = true;
  this.sfx.got.play();
  axe.kill();
};

PlayState.onGodVsTree = function (god, tree) {
  if (god.hasAxe) {
    this.keys.action.onDown.add(function () {
      var _this3 = this;

      var _this = this;
      this.sfx.chop.play(null, 0, 1, true);
      setTimeout(function () {
        _this.tree.kill();
        _this.sinner.isHappy = true;
        _this3.sfx.chop.stop();
      }, 1000);
    }, this);
  }
};

module.exports = PlayState;

},{"./characters/god":3,"./characters/lumberjack":4,"./characters/sinner":5}],10:[function(require,module,exports){
'use strict';

var preload = function preload() {
  this.game.load.image('background', 'assets/images/background.png');
  this.game.load.image('sinner', 'assets/images/sinner.png');
  this.game.load.image('interactArea', 'assets/images/interactArea.png');
  this.game.load.image('bullet', 'assets/images/bullet.png');
  this.game.load.image('platform', 'assets/images/platform.png');
  this.game.load.image('tree', 'assets/images/tree.png');
  this.game.load.image('cat', 'assets/images/cat.png');
  this.game.load.image('world', 'assets/images/world.png');
  this.game.load.image('mountain', 'assets/images/mountain.png');
  this.game.load.image('snow', 'assets/images/snow.png');
  this.game.load.image('water', 'assets/images/water.png');
  this.game.load.image('axe', 'assets/images/axe.png');

  this.game.load.audio('sfx:chop', 'assets/sound/chop.wav');
  this.game.load.audio('sfx:death', 'assets/sound/death.wav');
  this.game.load.audio('sfx:got', 'assets/sound/got.wav');
  this.game.load.audio('sfx:wrath', 'assets/sound/wrath.wav');

  this.game.load.spritesheet('god', 'assets/images/god.png', 99, 168);
  this.game.load.spritesheet('lumberjack', 'assets/images/lumberjack.png', 72, 123);
};

module.exports = preload;

},{}],11:[function(require,module,exports){
'use strict';

module.exports = function () {
  var _this = this;

  this.sinnerText.visible = false;
  this.lumberjackText.visible = false;
  this._handleCollisions();
  this._handleInput();

  if (this.lumberjack.isDead && this.sinner.isDead) {
    setTimeout(function () {
      _this.game.state.start('end', false, false, 'evil');
    }, 1000);
  }

  if (this.lumberjack.isHappy && this.sinner.isHappy) {
    setTimeout(function () {
      _this.game.state.start('end', false, false, 'awesome');
    }, 1000);
  }

  if (this.lumberjack.isHappy && this.sinner.isDead || this.lumberjack.isDead && this.sinner.isHappy) {
    setTimeout(function () {
      _this.game.state.start('end', false, false, 'regular');
    }, 1000);
  }
};

},{}]},{},[2]);
