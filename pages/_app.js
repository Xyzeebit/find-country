import React, { useState } from 'react'

import '../styles/globals.css'
import '../styles/layout.css';
import Layout from '../components/Layout';
import ThemeContext, { THEMES } from '../components/ThemeContext';

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState(THEMES.light);
  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeContext.Provider>
  );
}

export default MyApp
