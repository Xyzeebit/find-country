import { useState, useEffect } from 'react';
import Image from 'next/image'

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const image = '/arrow-right.svg';

  const styles = {
    container: {
      borderRadius: 10,
      padding: 5,
      background: '#b59e9e8c',
      border: 'none',
      outline: 'none',
      opacity: visible ? 1 : 0,
      transition: 'all 300ms ease-in-out',
      position: 'fixed',
      zIndex: 999,
      bottom: 100,
      right: 50,
      width: 50,
      // height: 50
    },
    img: {
      transform: 'rotate(-90deg)',
      width: 80,
      height: 100,
      // filter: 'invert(0)'
    }
  }

  function scrollHandler() {
    if(document.documentElement.scrollTop > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  function scrollToTop() {
    window.document.documentElement.scrollIntoView('nav');
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  return (
    <button style={styles.container} onClick={scrollToTop}>
      <img
        src={image}
        alt="back to top"
        width="80"
        height="100"
        style={styles.img}
      />
    </button>
  )
}
