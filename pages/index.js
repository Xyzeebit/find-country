import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useState, useEffect, useContext } from 'react';
import Country from '../components/Country';
import ThemeContext from '../components/ThemeContext';


export default function Home({ data }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [showList, setShowList] = useState(false);
  const [theme] = useContext(ThemeContext);

  const router = useRouter();

  const submitSearch = evt => {
    evt.preventDefault();

    setSearch('');
  }
  const showFilterList = () => {
    setShowList(!showList);
  }

  useEffect(() => {
    setShowList(false);
  }, [filter]);

  async function findCountry() {
    const { region } = router.query;
    const resp = await fetch(`/api/search?region=${region}`);
    const _data = await resp.json();
    console.log(_data);
  }

  useEffect(() => {
    // findCountry();
  }, []);

  return (
    <div className="main">
      <Head>
        <title>Search Country</title>
        <meta name="description" content="Learn about any country in the world" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome-min.css" />
      </Head>
      <div className="search-bar">
        <form method="GET" action="/api/search"
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
          <ul style={{
            display: (showList ? 'block' : 'none'),
            color: theme.text,
            background: theme.foreground,
          }}>
            <li>
              <Link href={{
                pathname: '/',
                query: { region: 'africa' }
              }}>
                <a>Africa</a>
              </Link>
            </li>
            <li>
            <Link href={{
              pathname: '/',
              query: { region: 'america' }
            }}>
              <a>America</a>
            </Link>
            </li>
            <li>
              <Link href={{
                pathname: '/',
                query: { region: 'asia' }
              }}>
                <a>Asia</a>
              </Link>
            </li>
            <li>
              <Link href={{
                pathname: '/',
                query: { region: 'europe' }
              }}>
                <a>Europe</a>
              </Link>
            </li>
            <li>
              <Link href={{
                pathname: '/',
                query: { region: 'oceania' }
              }}>
                <a>Oceania</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="grid">
        {data.map((country, i) => {
          return (
            <Link key={country.country.slug + i} href={{
              pathname: '/[country]',
              query:{country: country.country.slug}
              }}>
              <a style={{ color: theme.text }}>
                <Country />
              </a>
            </Link>
          )
        })}

      </div>
    </div>
  )
}


export async function getStaticProps() {
  const data = [
    { country: { slug: 'germany' } },
    { country: { slug: 'belgium' } },
    { country: { slug: 'germany' } },
    { country: { slug: 'germany' } },
    { country: { slug: 'germany' } },
    { country: { slug: 'germany' } },
    { country: { slug: 'germany' } },
    { country: { slug: 'germany' } },

  ];

  return {
    props: {
      data
    }
  }
}
