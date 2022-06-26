import { useState, useEffect } from 'react';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

export default function List() {
  const [data, setData] = useState(Array.from(Array(30).keys(), n => n + 1));
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreItems);

  function fetchMoreItems() {
    setTimeout(() => {
      setData(prev => ([...prev, ...Array.from(Array(30).keys()), n => n + prev.length + 1]))
      setIsFetching(false);
    }, 2000);
  }

  return (
    <>
      <ul>
        {
          data.map((item, i) => <li key={i}>List item: {item}</li>)
        }
      </ul>
      {isFetching && 'Fetching more items...'}
    </>
  );
}
