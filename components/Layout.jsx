import React, { useContext, useState, useEffect } from 'react';
import ThemeContext, { THEMES } from './ThemeContext';
import Image from 'next/image';

const Layout = ({ children }) => {
  const [mode, setMode] = useState(true);
  const [theme, setTheme] = useContext(ThemeContext);
  
  const toggleMode = () => {
    if (mode) {
      setMode(false); // dark mode
      
    } else {
      setMode(true);  // light mode
      
    }
  }
  
  useEffect(() => {
    setTheme((mode ? THEMES.light : THEMES.dark));
  }, [mode, setTheme]);

  return (
    <>
      <nav
        style={{background: theme.foreground}}
        className="nav">
        <div
          style={{color: theme.text}}
          className="nav-title">
          Where in the world?
        </div>
        <button
          style={{background: theme.foreground, color: theme.text}}
          className="toggle-mode-button"
          onClick={toggleMode}>
          <span>
            <Image 
              src={`/${mode ? 'moon-dark.svg' : 'moon-light.svg'}`}
              alt="site mode"
              width={20}
              height={20}
            />
          </span>
          <span>{`${mode ? 'Light Mode' : 'Dark Mode'}`}</span>
        </button>
      </nav>
      <main
        style={{ background: theme.background }}>
        {children}
      </main>
      </>
  );
}

export default Layout;
