import React from "react";
import { useState, useEffect } from "react";
import GameLayout from "../../components/GameLayout";
import ReactConfetti from "react-confetti";
import "./TicTacToe.css";

const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isDraw, setIsDraw] = useState(false);
  const [windowDimension, setWindowDimension] = useState<{width: number, height: number}>({width: 0, height: 0});
  
  // Get window dimensions for confetti
  useEffect(() => {
    const { innerWidth: width, innerHeight: height } = window;
    setWindowDimension({width, height});
  }, []);

  const handleClick = (index: number) => {
    if (board[index] || calculateWinner() || isDraw) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    
    // Check for draw after this move
    const updatedBoard = [...newBoard];
    if (!updatedBoard.includes(null) && !calculateWinner()) {
      setIsDraw(true);
    }
  };

  const calculateWinner = () => {
    // If we already found a winner, return it
    if (winningLine) return board[winningLine[0]];
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        // Store the winning line
        setWinningLine([a, b, c]);
        // Show confetti
        setShowConfetti(true);
        return board[a];
      }
    }
    return null;
  };

  const winner = calculateWinner();
  const status = winner ? `Winner: ${winner}` : isDraw ? "Game Draw!" : `Player: ${currentPlayer}`;

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinningLine(null);
    setShowConfetti(false);
    setIsDraw(false);
  };

  return (
    <GameLayout title="Tic Tac Toe">
      {showConfetti && (
        <ReactConfetti
          width={windowDimension.width}
          height={windowDimension.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.2}
        />
      )}
      <div className="game">
        <div className="game-info">
          <div className="tic-tac-toe-status">{status}</div>
          <button className="back-btn" onClick={resetGame}>
            Reset Game
          </button>
        </div>
        <div className="game-board">
          {board.map((value, index) => (
            <button
              key={index}
              className={`square ${value ? (value === 'X' ? 'filled-x' : 'filled-o') : ''} ${winningLine?.includes(index) ? 'winning' : ''} ${isDraw ? 'draw-square' : ''}`}
              onClick={() => handleClick(index)}
            >
              {value}
            </button>
          ))}
        </div>
      </div>
    </GameLayout>
  );
};

export default TicTacToe;
