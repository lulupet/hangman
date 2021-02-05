import './App.css';
import React, { Component } from 'react';

const LETTERS_1 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M']
const LETTERS_2 = ['N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

class App extends Component {
  state = {
    word: this.generateWord(),
    errors: 0,
    lettersTried: []
  }

  generateWord() {
    const words = ['ENVIRONMENT', 'HAPPINESS', 'PEANUTS', 'LEMONADE', 'CHECKMATE']
    return words[Math.floor(Math.random() * words.length)]
  }

  onClick = letter => {
    const { word, errors, lettersTried } = this.state

    if (!word.split('').includes(letter)) {
      const newErrors = errors + 1
      this.setState({ errors: newErrors })
    }
    const newLettersTried = lettersTried
    newLettersTried.push(letter)
    this.setState({ lettersTried: newLettersTried })
  }

  onRestart() {
    this.setState({ word: this.generateWord(), errors: 0, lettersTried: [] })
  }

  render() {
    const { word, errors, lettersTried } = this.state
    const lettersWord = word.split('')
    const won = lettersWord.every(element => lettersTried.includes(element))
    return (
      <div className='hangman'>
        <div className='word'>
          {word.split('').map((letter, index) => (
              <div className='wordLetter'>{lettersTried.includes(letter) ? letter : '_'}</div>
            ))}
        </div>
        <div className='errors'>{errors}</div>
        <div className='restartGame' onClick={() => this.onRestart()}>Restart game</div>
        <div className='keyboard'>
          <div className='firstRow'>
            {LETTERS_1.map((letter, index) => (
              <div className='letter' onClick={() => this.onClick(letter)}>{letter}</div>
            ))}
          </div>
          <div className='secondRow'>
            {LETTERS_2.map((letter, index) => (
              <div className='letter' onClick={() => this.onClick(letter)}>{letter}</div>
            ))}
          </div>
        </div>
        {won && <div className='wonMessage'>You won!</div>}
      </div>
    )
  }
}

export default App
