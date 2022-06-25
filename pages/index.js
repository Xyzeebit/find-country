import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useState, useEffect, useContext } from 'react';
import Country from '../components/Country';
import ThemeContext from '../components/ThemeContext';

import all from '../data';
import countries from '../rest-countries';


export default function Home() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [showList, setShowList] = useState(false);
  const [theme] = useContext(ThemeContext);
  const data = all.data;
  console.log(countries)

  const router = useRouter();

  const submitSearch = evt => {
    evt.preventDefault();
    console.log(search)
    // find search item in data
    setSearch('');
  }
  const showFilterList = () => {
    setShowList(!showList);
  }

  useEffect(() => {
    setShowList(false);
  }, [filter]);

  async function findCountryByRegion() {
    const { region } = router.query;
    // const resp = await fetch(`/api/search?region=${region}`);
    // const _data = await resp.json();
    console.log(region);
  }

  async function searchCountry() {
    const { search } = router.query;
    console.log(search);
  }

  useEffect(() => {
    let queryIndex = router.asPath.indexOf('?');
    console.log(queryIndex);

    if(queryIndex > -1) {

      setFilter(
        router.asPath.split('?')[1].split('=')[1]
      )
    }
  }, [router]);
  useEffect(() => {
    // console.log(all)
    if(filter) {
      console.log(filter)
    }
  }, [filter]);

  return (
    <div className="main">
      <Head>
        <title>Search Country</title>
        <meta name="description" content="Learn about any country in the world" />
        <link rel="icon" href="/favicon.png" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome-min.css" />
      </Head>
      <div className="search-bar">
        <form
          style={{
              background: theme.foreground
            }}>

          <div className="input-group">
            <span style={{background: theme.foreground}}>
              <i className="fa fa-search" style={{color: theme.input}} />
            </span>
            <input
              type="text"
              placeholder="Search for a country..."
              value={search}
              name="search"
              onChange={({ target }) => setSearch(target.value)}
              style={{
                background: theme.foreground,
                color: theme.text,
                '--placeholder-color': theme.input,
              }}
            />
          </div>
        </form>

        <div className="search-filter">
          <button onClick={showFilterList}
            style={{
              background: theme.foreground,
              color: theme.text,
            }}>
            <span>Filter by Region</span>
            <span >
              <i className="fa fa-angle-down" style={{color: theme.text}} />
            </span>
          </button>

          <div className="filter_list" style={{
            display: (showList ? 'block' : 'none'),
            color: theme.text,
            background: theme.foreground,
          }}>
            <Link href={{
              pathname: '/',
              query: { region: 'africa' }
            }}>
              <a onClick={showFilterList}>Africa</a>
            </Link>
            <Link href={{
              pathname: '/',
              query: { region: 'americas' }
            }}>
              <a onClick={showFilterList}>Americas</a>
            </Link>
              <Link href={{
                pathname: '/',
                query: { region: 'asia' }
              }}>
                <a onClick={showFilterList}>Asia</a>
              </Link>
              <Link href={{
                pathname: '/',
                query: { region: 'europe' }
              }}>
                <a onClick={showFilterList}>Europe</a>
              </Link>
              <Link href={{
                pathname: '/',
                query: { region: 'oceania' }
              }}>
                <a onClick={showFilterList}>Oceania</a>
              </Link>


          </div>


        </div>
      </div>
      <div className="grid">
        {countries.data.map((country, i) => {

          const countryName = country.name.common;
          const population = country.population + '';
          const flag = country.flags.svg;
          // const capital = country.capital.join(', ');
          let capital = '';
          if(country.capital) {
            capital = country.capital.join(', ');
          }
          const region = country.region;

          return (
            <Link key={country.common + i} href={{
              pathname: '/[country]',
              query:{country: country.common}
              }}>
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
        })}

      </div>
    </div>
  )
}
