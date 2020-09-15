import React, { useEffect, useState } from 'react';

import './App.css';

function App() {
  let [currentWord, setCurrentWord] = useState('');
  let [guessedWords, setGuessedWords] = useState([]);
  let [wrongAttempts, setWrongAttempts] = useState(0);
  let [gameOver, setGameOver] = useState(true);
  
  useEffect(() => {
    setCurrentWord(getRandomWord());
  }, []);

  let words = ['hello', 'India', 'bicycle', 'universe'];

  let getRandomWord = () => {
    let randIndex = Math.floor(Math.random() * words.length)
    return words[randIndex];
  }

  let userGuessed = (letter) => {
    if(!guessedWords.includes(letter)){
      setGuessedWords(guessedWords.concat(letter));
      if(!currentWord.includes(letter)){
        setWrongAttempts(wrongAttempts+1);
      }
      if(wrongAttempts > 10){
        setGameOver(true);
      }
    }

  }  
  let enterPress = (e) => {
    console.log("key pressed");
    if(e.charCode == 13){
      userGuessed(e.target.value);
      e.target.value = ''
   }
   
  }

  let getPlaceHolder = () => {
    let result =  Array(currentWord.length).fill(' _ ');
    for(let i =0; i<currentWord.length; i++){
      let letter = currentWord[i];
      if(guessedWords.includes(letter)){
        result[i] = ` ${letter} `;
      }
    }
    return result;
  }
  let reset = (e) => {
    setGameOver(false);
    setWrongAttempts(0);
    setGuessedWords([]);
    setCurrentWord(getRandomWord());

  }

  // HTML
  return (
    <div className="main-container">
      <h1 className="heading">
        Hangman Game
        
      </h1>
      {!gameOver && (
        <React.Fragment>
          <h3 style={{color: '#B33771'}}>Wrong Attempts: {wrongAttempts}</h3>
          <div className="hangman-container">
            <img src={require(`./assets/${wrongAttempts}.png`)} alt=""/>
          </div>
          <input disabled={gameOver} type="text" maxLength="1" onKeyPress={enterPress} />
          <div className="placeholder">{getPlaceHolder()}</div>
        </React.Fragment>
      )}
      {gameOver && (
      <React.Fragment>
        <h2 className="red">GAME OVER!</h2>
        <div className="hangman-container">
          <img src={require(`./assets/11.png`)} alt=""/>
        </div>
        <button className="reset-btn" onClick={reset}>New Game</button>
    </React.Fragment>
    )}

    </div>
  );
}

export default App;
