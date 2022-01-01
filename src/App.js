import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [score, setScore] = useState(() => 5);
  const [highScore, setHighScore] = useState(() => 0);
  const [guessMinMax, setGuessMinMax] = useState([1, 5]);
  const [randomNumber, setRandomNumber] = useState(() => '');
  const [guessedNumber, setGuessedNumber] = useState(() => 0);
  const [gameStatus, setGameStatus] = useState('initial');
  const [message, setMessage] = useState('Start guessing...');

  // TODO
  // function handleReset() {
  //   console.log(state.randomNumber);
  // }

  // Create random number between 1 and 20
  useEffect(() => {
    function createRandomNumber() {
      const number = Math.round(
        Math.random() * (guessMinMax[1] - guessMinMax[0]) + guessMinMax[0]
      );
      setRandomNumber(number);
    }
    createRandomNumber();
  }, [guessMinMax]);

  function handleGuessInput(e) {
    setGuessedNumber(+e.target.value);
  }

  function handleCheck() {
    const guessInput = document.querySelector('.guess');

    // Game is running
    if (score > 0) {
      // if number format is not good
      if (
        guessedNumber <= 0 ||
        guessedNumber === '' ||
        typeof guessedNumber !== 'number'
      ) {
        // Change message for error
        // lose 1 point
        setScore((prevScore) => prevScore - 1);
        setMessage('Number must be above zero');
        // if wrong guess
      } else if (randomNumber !== guessedNumber) {
        setScore((prevScore) => prevScore - 1);
        setMessage('Try again...');
        // empty input
        guessInput.value = '';
        // VICTORY
      } else if (randomNumber === guessedNumber) {
        setMessage('Victory!!!');
        setHighScore(score);
        setGameStatus('victory');
        // Game end
      }
    } else {
      // Change message for error
      setMessage('Game lost');
      setGameStatus('lost');
    }
  }
  console.log(gameStatus);
  return (
    <>
      <header>
        <h1>Guess My Number!</h1>
        <p className="between">
          (Between {guessMinMax[0]} and {guessMinMax[1]})
        </p>
        <button className="btn again">Again!</button>
        <div
          className={
            (gameStatus === 'victory' && 'number victory') ||
            (gameStatus === 'lost' && 'number lost') ||
            'number'
          }
        >
          {gameStatus === 'initial' ? '?' : randomNumber}
        </div>
      </header>
      <main>
        <section className="left">
          <input
            type="number"
            className="guess"
            onChange={(e) => handleGuessInput(e)}
          />
          <button className="btn check" onClick={handleCheck}>
            Check!
          </button>
        </section>
        <section className="right">
          <p className="message">{message}</p>
          <p className="label-score">
            💯 Score: <span className="score">{score}</span>
          </p>
          <p className="label-highscore">
            🥇 Highscore: <span className="highscore">{highScore}</span>
          </p>
        </section>
      </main>
    </>
  );
}

export default App;
