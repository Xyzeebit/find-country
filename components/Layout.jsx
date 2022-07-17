import Link from 'next/link';
import { useRouter} from 'next/router';
import React, { useContext, useState, useEffect } from 'react';
import ThemeContext, { THEMES } from './ThemeContext';

const Layout = ({ children }) => {
  const [theme, setTheme] = useContext(ThemeContext);
  const router = useRouter();

  const toggleMode = () => {
    if (theme.mode === 0) {
	  setTheme(THEMES.dark);
    } else {
	  setTheme(THEMES.light);
    }
  }

  useEffect(() => {
	document.getElementsByTagName('body')[0].style.backgroundColor = theme.background;
  }, [theme.mode]);

  return (
    <>
      <nav
        style={{background: theme.foreground}}
        className="nav">
        <div
          style={{color: theme.text}}
          className="nav-title">
          <Link href="/"><a onClick={() => {router.push('/');} }>Where in the world?</a></Link>
        </div>
        <button
          style={{background: theme.foreground, color: theme.text}}
          className="toggle-mode-button"
          onClick={toggleMode}>
          <span>
            <img
              src='/sun-color.svg'
              alt="site mode"
              width={20}
              height={20}
              style={{ filter: `${theme.mode === 0 ? 'invert(144%) sepia(1) saturate(42.6) hue-rotate(161.4deg) brightness(0.51)' : 'invert(0)'}`}}
            />
          </span>
          <span>{`${theme.mode ? 'Light Mode' : 'Dark Mode'}`}</span>
        </button>
      </nav>
      <main>
        {children}
      </main>
      </>
  );
}

export default Layout;
