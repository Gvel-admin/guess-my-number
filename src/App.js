import { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 5,
      highScore: 0,
      guessMinMax: [1, 5],
      randomNumber: 0,
      guessedNumber: 0,
      gameStatus: 'initial',
      message: 'Start guessing...',
    };
  }

  componentDidMount() {
    this.setState({ guessedNumber: this.createRandomNumber() }, () => {
      console.log('randomNumber: ', this.state.randomNumber);
      console.log('state: ', this.state);
    });
  }

  handleReset() {
    console.log(this.state.randomNumber);
  }

  // Create random number between 1 and 20
  createRandomNumber = () => {
    this.setState((prevState) => {
      return {
        randomNumber: Math.round(
          Math.random() *
            (prevState.guessMinMax[1] - prevState.guessMinMax[0]) +
            prevState.guessMinMax[0]
        ),
      };
    });
  };

  handleGuessInput = (e) => {
    this.setState({ guessedNumber: +e.target.value });
  };

  handleCheck = () => {
    const guessInput = document.querySelector('.guess');

    // Game is running
    if (this.state.score > 0) {
      // if number format is not good
      if (
        this.state.guessedNumber <= 0 ||
        this.state.guessedNumber === '' ||
        typeof this.state.guessedNumber !== 'number'
      ) {
        // Change message for error
        // lose 1 point
        this.setState((prevState) => {
          return {
            score: prevState.score - 1,
            message: 'Number must be above zero',
          };
        });
        // if wrong guess
      } else if (this.state.randomNumber !== this.state.guessedNumber) {
        this.setState((prevState) => {
          return {
            score: prevState.score - 1, // Change message for error
            message: 'Try again...',
          }; // lose 1 point
        });
        // empty input
        guessInput.value = '';
        // VICTORY
      } else if (this.state.randomNumber === this.state.guessedNumber) {
        this.setState((prevState) => {
          return {
            message: 'Victory!!!', // Change message for error
            highScore: prevState.score, // set highscore to currentscore
            gameStatus: 'victory', // change status
          };
        });

        // Game end
      }
    } else {
      // Change message for error
      this.setState({ message: 'Game lost', gameStatus: 'lost' });
    }
  };

  render() {
    return (
      <>
        <header>
          <h1>Guess My Number!</h1>
          <p className="between">
            (Between {this.state.guessMinMax[0]} and {this.state.guessMinMax[1]}
            )
          </p>
          <button className="btn again">Again!</button>
          <div
            className={
              (this.state.gameStatus === 'victory' && 'number victory') ||
              (this.state.gameStatus === 'lost' && 'number lost') ||
              'number'
            }
          >
            {this.state.gameStatus === 'initial'
              ? '?'
              : this.state.randomNumber}
          </div>
        </header>
        <main>
          <section className="left">
            <input
              type="number"
              className="guess"
              onChange={(e) => this.handleGuessInput(e)}
            />
            <button className="btn check" onClick={this.handleCheck}>
              Check!
            </button>
          </section>
          <section className="right">
            <p className="message">{this.state.message}</p>
            <p className="label-score">
              💯 Score: <span className="score">{this.state.score}</span>
            </p>
            <p className="label-highscore">
              🥇 Highscore:{' '}
              <span className="highscore">{this.state.highScore}</span>
            </p>
          </section>
        </main>
      </>
    );
  }
}

export default App;
