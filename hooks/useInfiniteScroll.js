import { useState, useEffect } from 'react';

const useInfiniteScroll = (callback) => {
  const [isFetching, setIsFetching] = useState(false);

  function handleScroll() {
    if(window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight || isFetching) {
      return;
    }
    setIsFetching(true);
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.addEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if(!isFetching) return;
    callback(() => {
      console.log('callback...');
    });
  }, [isFetching]);


  return [isFetching, setIsFetching];
}

export default useInfiniteScroll;
