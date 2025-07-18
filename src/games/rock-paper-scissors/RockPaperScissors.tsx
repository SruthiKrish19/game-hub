import React, { useState, useEffect } from 'react';
import GameLayout from '../../components/GameLayout';
import './RockPaperScissors.css';
// import ReactConfetti from 'react-confetti';

type Choice = 'rock' | 'paper' | 'scissors' | null;
type Result = 'win' | 'lose' | 'draw' | null;

const RockPaperScissors: React.FC = () => {
  const [playerChoice, setPlayerChoice] = useState<Choice>(null);
  const [computerChoice, setComputerChoice] = useState<Choice>(null);
  const [result, setResult] = useState<Result>(null);
  const [score, setScore] = useState({ player: 0, computer: 0 });
//   const [showConfetti, setShowConfetti] = useState<boolean>(false);
//   const [windowDimension, setWindowDimension] = useState<{width: number, height: number}>({width: 0, height: 0});
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // Get window dimensions for confetti
//   useEffect(() => {
//     const { innerWidth: width, innerHeight: height } = window;
//     setWindowDimension({width, height});
//   }, []);

  const choices: Choice[] = ['rock', 'paper', 'scissors'];

  const getComputerChoice = (): Choice => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  };

  const determineWinner = (player: Choice, computer: Choice): Result => {
    if (player === computer) return 'draw';
    
    if (
      (player === 'rock' && computer === 'scissors') ||
      (player === 'paper' && computer === 'rock') ||
      (player === 'scissors' && computer === 'paper')
    ) {
      return 'win';
    }
    
    return 'lose';
  };

  const handleChoice = (choice: Choice) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setPlayerChoice(choice);
    setComputerChoice(null);
    setResult(null);
    
    // Simulate computer thinking
    setTimeout(() => {
      const computer = getComputerChoice();
      setComputerChoice(computer);
      
      const gameResult = determineWinner(choice, computer);
      setResult(gameResult);
      
      // Update score
      if (gameResult === 'win') {
        setScore(prev => ({ ...prev, player: prev.player + 1 }));
        // setShowConfetti(true);
        // setTimeout(() => setShowConfetti(false), 3000);
      } else if (gameResult === 'lose') {
        setScore(prev => ({ ...prev, computer: prev.computer + 1 }));
      }
      
      setIsAnimating(false);
    }, 1000);
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setScore({ player: 0, computer: 0 });
    // setShowConfetti(false);
  };

  const getResultText = () => {
    if (!result) return '';
    if (result === 'win') return 'You Win!';
    if (result === 'lose') return 'You Lose!';
    return 'Draw!';
  };

  const getChoiceEmoji = (choice: Choice) => {
    if (choice === 'rock') return '👊';
    if (choice === 'paper') return '✋';
    if (choice === 'scissors') return '✌️';
    return '❓';
  };

  return (
    <GameLayout title="Rock Paper Scissors">
      {/* {showConfetti && (
        <ReactConfetti
          width={windowDimension.width}
          height={windowDimension.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.2}
          style={{ position: 'fixed', top: 0, left: 0, zIndex: 1000 }}
        />
      )} */}
      
      <div className="rps-container">
        <div className="score-board">
          <div className="score-box">
            <span className="score-label">You</span>
            <span className="score-value">{score.player}</span>
          </div>
          <div className="score-box">
            <span className="score-label">Computer</span>
            <span className="score-value">{score.computer}</span>
          </div>
        </div>
        
        <div className="game-info">
          <div className="rps-status">
            {result ? getResultText() : 'Choose your move!'}
          </div>
          <button className="reset-button" onClick={resetGame}>
            Reset Game
          </button>
        </div>
        
        <div className="choices-area">
          <div className="player-choice">
            <h3>Your Choice</h3>
            <div className={`choice-display ${playerChoice ? 'chosen' : ''} ${result === 'win' ? 'winner' : ''}`}>
              {playerChoice ? (
                <span className="choice-emoji">{getChoiceEmoji(playerChoice)}</span>
              ) : (
                <span className="choice-placeholder">?</span>
              )}
            </div>
          </div>
          
          <div className="computer-choice">
            <h3>Computer's Choice</h3>
            <div className={`choice-display ${computerChoice ? 'chosen' : ''} ${result === 'lose' ? 'winner' : ''}`}>
              {computerChoice ? (
                <span className="choice-emoji">{getChoiceEmoji(computerChoice)}</span>
              ) : (
                <span className="choice-placeholder">?</span>
              )}
            </div>
          </div>
        </div>
        
        <div className="choice-buttons">
          {choices.map((choice) => {
            // Since we're filtering out null values in the choices array, we can safely assert choice is non-null
            const nonNullChoice = choice as 'rock' | 'paper' | 'scissors';
            return (
              <button
                key={nonNullChoice}
                className={`choice-button ${playerChoice === nonNullChoice ? 'selected' : ''}`}
                onClick={() => handleChoice(nonNullChoice)}
                disabled={isAnimating}
              >
                <span className="choice-emoji">{getChoiceEmoji(nonNullChoice)}</span>
                <span className="choice-text">{nonNullChoice.charAt(0).toUpperCase() + nonNullChoice.slice(1)}</span>
              </button>
            );
          })}
        </div>
      </div>
    </GameLayout>
  );
};

export default RockPaperScissors;
