import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  customAction?: () => void;
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ 
  title = 'Gamers Alley', 
  showBackButton = false,
  customAction,
  children
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const handleBack = () => {
    if (customAction) {
      customAction();
    } else {
      navigate(-1);
    }
  };

  return (
    <header className="enhanced-header">
      <div className="header-content">
        {isHomePage && (
          <div className="header-decoration">
            <img src="/gamers-alley.png" height={42} width={42} />
          </div>
        )}
        {showBackButton && (
          <button className="header-back-btn" onClick={handleBack}>
            <span className="back-arrow">←</span>
          </button>
        )}
        <h1 className="header-title">{title}</h1>
        {children}
      </div>
    </header>
  )
}

export default Header
