import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useState, useEffect, useContext, useMemo } from 'react';
import Country from '../components/Country';
import BackToTop from '../components/BackToTop';
import ThemeContext from '../components/ThemeContext';

// import all from '../data';
import countries from '../rest-countries';


export default function Home() {
  const LIMIT = 20;
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [showList, setShowList] = useState(false);
  const [theme] = useContext(ThemeContext);
  const [data, setData] = useState(countries.data);
  const [showSearch, setshowSearch] = useState({ show: false, search: '' });

  const router = useRouter();

  const matched = (text, matcher) => {
    if(text.match(matcher) !== null) {
      return true;
    }
    return false;
  }


  const submitSearch = evt => {
    evt.preventDefault();

    const result = countries.data.filter((c) => {
      const sanitized = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&').toLowerCase();
      const name = c.name.common.toLowerCase();
      if(matched(name, sanitized)) return true;

      const official = c.name.official.toLowerCase();
      if(matched(official, sanitized)) return true;

      if(c.capital) {
        const capitals = c.capital.map(cap => matched(cap.toLowerCase(), sanitized));
        if(capitals.includes(true)) return true;
      }

      if(c.continents) {
        const continents = c.continents.map(con => matched(con.toLowerCase(), sanitized));
        if(continents.includes(true)) return true;
      }


      return false;
    })

    if(result) {
      if(Array.isArray(result)) {
        setData(result);
      } else {
        setData([result]);
      }
    }
    setshowSearch({ show: true, search })
    setSearch('');
  }
  const showFilterList = () => {
    setShowList(!showList);
  }


  useEffect(() => {
    setShowList(false);
  }, [filter]);

  function findCountryByRegion() {
    const { region } = router.query;
    const result = countries.data.filter(c => c.region.toLowerCase() === filter);

    if(result) {
      if(Array.isArray(result)) {
        setData(result);
      } else {
        setData([result]);
      }
    }
  }

  useEffect(() => {
    let queryIndex = router.asPath.indexOf('?');

    if(queryIndex > -1) {

      setFilter(
        router.asPath.split('?')[1].split('=')[1]
      )
    } else {
      setData(countries.data);
    }
  }, [router]);

  useEffect(() => {

    if(filter) {
      findCountryByRegion();
      setshowSearch({ ...showSearch, show: false });
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
            }}
            onSubmit={submitSearch}
        >

          <div className="input-group">

            <input
              type="text"
              placeholder="Search for a country..."
              value={search}
              name="search"
              onChange={({ target }) => setSearch(target.value)}
              style={{
                backgroundColor: theme.foreground,
                color: theme.text,
                '--placeholder-color': theme.input,
                backgroundImage: 'url(/icon-search.svg)',
                backgroundPosition: 'left center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 25
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
      {showSearch.show && <div className="search_details">
        Showing result for "{showSearch.search}"...
      </div>}

      {<div className="grid">
        {data.map((country, i) => {

          const countryName = country.name.common;
          const population = country.population.toLocaleString('en-US');
          const flag = '/flag.jpg'; //country.flags.svg;
          let capital = '';
          if(country.capital) {
            capital = country.capital.join(', ');
          }
          const region = country.region;
          const path = country.name.common.toLowerCase().replace(/\W+/g, '-')

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
        })}
      </div>}
      <BackToTop />
    </div>
  )
}
