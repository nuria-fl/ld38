// Endstate
module.exports = {
  init: function (score) {
    this.game.score = score
  },

  create: function () {
    const textStyle = {
      font: '40px Amatica SC',
      fill: '#fff',
      boundsAlignH: 'center',
      boundsAlignV: 'middle'
    }

    const gameOver = this.game.add.text(0, 0, ' Game Over ', Object.assign({}, textStyle, {
      font: '80px Amatica SC'
    }))
    gameOver.setShadow(-2, 2, '#000', 0)
    gameOver.setTextBounds(0, 200, 960, 100)

    const scoreTextContent = {
      line1: '',
      line2: ''
    }

    if (this.game.score === 'evil') {
      scoreTextContent.line1 = 'You are a cruel god.'
      scoreTextContent.line2 = 'There\'s no one left to worship you.'
    } else if (this.game.score === 'awesome') {
      scoreTextContent.line1 = 'You are a benign god.'
      scoreTextContent.line2 = 'Your tiny world will flourish.'
    } else {
      scoreTextContent.line1 = 'You are a strange god.'
      scoreTextContent.line2 = 'Your believers don\'t know what to expect of you'
    }

    const scoreTextLine1 = this.game.add.text(0, 0, scoreTextContent.line1, textStyle)
    scoreTextLine1.setShadow(-2, 2, '#000', 0)
    scoreTextLine1.setTextBounds(0, 300, 960, 100)

    const scoreTextLine2 = this.game.add.text(0, 0, scoreTextContent.line2, textStyle)
    scoreTextLine2.setShadow(-2, 2, '#000', 0)
    scoreTextLine2.setTextBounds(0, 350, 960, 100)
  }
}
