import React, { useState, useEffect } from 'react';
import GameLayout from '../../components/GameLayout';
import './ConnectFour.css';
import ReactConfetti from 'react-confetti';

const ROWS = 6;
const COLS = 7;
const EMPTY = null;
const PLAYER1 = 'red';
const PLAYER2 = 'blue';

const ConnectFour: React.FC = () => {
  const [board, setBoard] = useState<(string | null)[][]>(createEmptyBoard());
  const [currentPlayer, setCurrentPlayer] = useState<string>(PLAYER1);
  const [winner, setWinner] = useState<string | null>(null);
  const [isDraw, setIsDraw] = useState<boolean>(false);
  const [winningCells, setWinningCells] = useState<[number, number][]>([]);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [windowDimension, setWindowDimension] = useState<{width: number, height: number}>({width: 0, height: 0});

  // Get window dimensions for confetti
  useEffect(() => {
    const { innerWidth: width, innerHeight: height } = window;
    setWindowDimension({width, height});
  }, []);

  function createEmptyBoard() {
    return Array(ROWS).fill(null).map(() => Array(COLS).fill(EMPTY));
  }

  const resetGame = () => {
    setBoard(createEmptyBoard());
    setCurrentPlayer(PLAYER1);
    setWinner(null);
    setIsDraw(false);
    setWinningCells([]);
    setShowConfetti(false);
  };

  const dropDisc = (col: number) => {
    if (winner || isDraw) return;

    // Find the lowest empty cell in the selected column
    const newBoard = [...board.map(row => [...row])];
    let row = -1;

    for (let r = ROWS - 1; r >= 0; r--) {
      if (newBoard[r][col] === EMPTY) {
        row = r;
        break;
      }
    }

    // If column is full, do nothing
    if (row === -1) return;

    // Place disc in the lowest empty cell
    newBoard[row][col] = currentPlayer;
    setBoard(newBoard);

    // Check for win
    const winResult = checkWin(newBoard, row, col, currentPlayer);
    if (winResult.hasWon) {
      setWinner(currentPlayer);
      setWinningCells(winResult.winningCells);
      setShowConfetti(true);
      return;
    }

    // Check for draw
    if (checkDraw(newBoard)) {
      setIsDraw(true);
      return;
    }

    // Switch player
    setCurrentPlayer(currentPlayer === PLAYER1 ? PLAYER2 : PLAYER1);
  };

  const checkWin = (board: (string | null)[][], row: number, col: number, player: string) => {
    const directions = [
      [0, 1],  // horizontal
      [1, 0],  // vertical
      [1, 1],  // diagonal /
      [1, -1], // diagonal \
    ];

    for (const [dr, dc] of directions) {
      const winningCells: [number, number][] = [];
      
      // Check in both directions
      for (let dir = -1; dir <= 1; dir += 2) {
        if (dir === 0) continue; // Skip the center point
        
        for (let i = 1; i < 4; i++) {
          const r = row + dr * dir * i;
          const c = col + dc * dir * i;
          
          if (r < 0 || r >= ROWS || c < 0 || c >= COLS || board[r][c] !== player) {
            break;
          }
          
          winningCells.push([r, c]);
        }
      }
      
      // Add the current cell
      winningCells.push([row, col]);
      
      if (winningCells.length >= 4) {
        return { hasWon: true, winningCells };
      }
      
      // Reset for next direction
      winningCells.length = 0;
    }
    
    return { hasWon: false, winningCells: [] };
  };

  const checkDraw = (board: (string | null)[][]) => {
    // Check if all cells in the top row are filled
    return board[0].every(cell => cell !== EMPTY);
  };

  const renderCell = (row: number, col: number) => {
    const value = board[row][col];
    const isWinningCell = winningCells.some(([r, c]) => r === row && c === col);
    
    return (
      <div 
        key={`${row}-${col}`} 
        className={`cell ${value ? `filled-${value}` : ''} ${isWinningCell ? 'winning' : ''} ${isDraw ? 'draw' : ''}`}
      >
        <div className="disc"></div>
      </div>
    );
  };

  const renderColumnButton = (col: number) => {
    return (
      <button 
        key={col}
        className="column-button"
        onClick={() => dropDisc(col)}
        disabled={winner !== null || isDraw || board[0][col] !== EMPTY}
      >
        ↓
      </button>
    );
  };

  const status = winner 
    ? `Winner: ${winner === PLAYER1 ? 'Red' : 'Blue'}` 
    : isDraw 
    ? "Game Draw!" 
    : `Player: ${currentPlayer === PLAYER1 ? 'Red' : 'Blue'}`;

  return (
    <GameLayout title="Connect Four">
      {showConfetti && (
        <ReactConfetti
          width={windowDimension.width}
          height={windowDimension.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.2}
          style={{ position: 'fixed', top: 0, left: 0}}
        />
      )}
      <div className="connect-four-container">
        
        <div className="game-info">
          <div className="connect-four-status">{status}</div>
          <button className="reset-button" onClick={resetGame}>Reset Game</button>
        </div>
        
        <div className="column-buttons">
          {Array(COLS).fill(null).map((_, col) => renderColumnButton(col))}
        </div>
        
        <div className="board">
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
              {row.map((_, colIndex) => renderCell(rowIndex, colIndex))}
            </div>
          ))}
        </div>
      </div>
    </GameLayout>
  );
};

export default ConnectFour;