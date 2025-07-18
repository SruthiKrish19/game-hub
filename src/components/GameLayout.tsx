import React from 'react'
import Header from './Header'

interface GameLayoutProps {
  title: string
  children: React.ReactNode
}

const GameLayout: React.FC<GameLayoutProps> = ({ title, children }) => {
  return (
    <div className="game-layout">
      <Header title={title} showBackButton={true} />
      <main className="game-page-body">{children}</main>
    </div>
  )
}

export default GameLayout
