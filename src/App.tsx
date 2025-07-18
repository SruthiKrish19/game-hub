import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/Header";
import GameList, { Game } from "./components/GameList";
import ThemeToggle from "./components/ThemeToggle";

import TicTacToe from "./games/tic-tac-toe/TicTacToe";
import ticTacToeLogo from "./assets/tic-tac-toe.svg";

import ConnectFour from "./games/connect-four/ConnectFour";
import connectFourLogo from "./assets/connect-four.svg";

import RockPaperScissors from "./games/rock-paper-scissors/RockPaperScissors";
import rockPaperScissorsLogo from "./assets/rock-paper-scissors.svg";

const App: React.FC = () => {
  const games: Game[] = [
    {
      title: "Tic Tac Toe",
      path: "/tic-tac-toe",
      image: ticTacToeLogo,
      element: <TicTacToe />,
    },
    {
      title: "Connect Four",
      path: "/connect-four",
      image: connectFourLogo,
      element: <ConnectFour />,
    },
    {
      title: "Rock Paper Scissors",
      path: "/rock-paper-scissors",
      image: rockPaperScissorsLogo,
      element: <RockPaperScissors />,
    },
  ];

  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <Header title="Gamers Alley">
            {/* <ThemeToggle /> */}
          </Header>
          <div className="app-content">
            <Routes>
              <Route path="/" element={<GameList games={games} />} />
              {games.map((game) => (
                <Route
                  key={game.path}
                  path={game.path}
                  element={game.element}
                />
              ))}
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
