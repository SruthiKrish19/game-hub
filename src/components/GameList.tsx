import React from 'react'
import { Link } from 'react-router-dom'

export type Game = {
  title: string
  path: string
  image?: string
  element?: React.ReactNode
}

interface HomeProps {
  games: Game[]
}

const GameList: React.FC<HomeProps> = ({ games }) => {
  return (
      <div className="card-grid">
        {games.map((game) => (
          <Link key={game.title} to={game.path} className="game-card">
            {game.image && (
              <img src={game.image} alt={game.title} className="game-image" />
            )}
            <h3>{game.title}</h3>
          </Link>
        ))}
      </div>
  )
}

export default GameList
