import { useState, useEffect, useContext } from 'react';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import Country from './Country';
import Link from 'next/link';
import ThemeContext from './ThemeContext';

export default function List({ countries }) {
  const LIMIT = 20;
  const [data, setData] = useState(countries.slice(0, LIMIT));
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreItems);
  // const [hasMore, setHasMore] = useState(true);
  const [theme] = useContext(ThemeContext);

  // console.log('is fetching', isFetching, 'has more', hasMore);
  console.log('fetched', data);

  function fetchMoreItems() {
    console.log('fetching outside');

    setTimeout(() => {
      let fetching, more;
      if(data.length + LIMIT < countries.length) {
        setData([...data, ...countries.slice(data.length, data.length + LIMIT)]);
        fetching = true;
        console.log('fetching');
        // more = true;
        // setHasMore(true);
        // console.log(data);

      } else {
        setData([...data, ...countries.slice(data.length)]);
        // setIsFetching(false);
        fetching = false;
        console.log('fetching');

        // more = false;
        // setHasMore(false);
        // console.log(data);
      }
      setIsFetching(fetching);
      // setHasMore(more);
      console.log(data);

    }, 1500);
  }


  return (
    <>
      <div className="grid">
        { data.map((country, i) => {
            const countryName = country.name.common;
            const population = country.population.toLocaleString('en-US');
            const flag = '/flag.jpg'; //country.flags.svg;
            let capital = '';
            if(country.capital) {
              capital = country.capital.join(', ');
            }
            const region = country.region;
            const path = country.name.common.toLowerCase().replace(/\W+/g, '-');
            return (
              <Link key={countryName + i} href='/[country]' as={`/${path}`}>
                <a style={{ color: theme.text }}>
                  <Country
                    countryName={countryName}
                    population={population}
                    flag={flag}
                    capital={capital}
                    region={region}
                  />
                </a>
              </Link>
            )
          })
        }
      </div>
      {(isFetching) && <Loader /> }
    </>
  );
}

const Loader = () => {
  const style = {
    width: 30,
    height: 30,
    border: '5px solid #ccc',
    borderTop: '5px solid green',
    margin: '20px auto',
    borderRadius: 100,
  }
  return (
    <div className="loader"></div>
  )
}
