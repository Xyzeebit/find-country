import { useState, useEffect, useContext } from 'react';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import Country from './Country';
import Link from 'next/link';
import ThemeContext from './ThemeContext';

export default function List({ data }) {
  const LIMIT = 20;
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreItems);

  const [countries, setCountries] = useState({ data: [], hasMore: true, current: 0 });

  const [theme] = useContext(ThemeContext);

  // console.log('fetched', countries);

  function fetchMoreItems() {
    if(!countries.hasMore) return;
    // console.log('calling fetchMore');
    setTimeout(() => {
      if(data.length > LIMIT + countries.current) {
        setCountries(prev => ({
          data: [...prev.data, ...data.slice(prev.current, prev.current + LIMIT)],
          hasMore: true,
          current: prev.current + LIMIT
        }));
      } else {
        setCountries(prev => ({
          data: [...prev.data, ...data.slice(prev.current)],
          hasMore: false,
          current: data.length
        }));
      }
      setIsFetching(false);
    }, 1500);

  }

  useEffect(() => {
    if(countries.data.length > 1) return;
    console.log('initial fetch');
    fetchMoreItems();
  }, []);

  // useEffect(() => {
  //   setData(prev => [...prev, ...countries]);
  // }, [countries]);

  return (
    <>
      <div className="grid">
        {countries.data && countries.data.map((country, i) => {
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
      {(isFetching && countries.hasMore) && <Loader /> }
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
