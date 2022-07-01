import { useRouter } from "next/router";
import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect, useContext } from "react";
import ThemeContext from "../components/ThemeContext";
import countries from '../rest-countries';
import Loader from '../components/Loader';

export default function Details() {
    const router = useRouter();
    const [theme] = useContext(ThemeContext);
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    function parseData(data) {
      // console.log(data);
      const countryName = data.name.common;
      const nativeName = Object.values(Object.values(data.name.nativeName)[0])[0];
      const population = data.population.toLocaleString('en-US');
      const region = data.region;
      const subRegion = data.subregion;
      const capital = data.capital.join(', ');
      let languages = [];
      for(let key of Object.keys(data.languages)) {
        languages.push(data.languages[key])
      }
      languages = languages.join(', ');
      const flag = 'flag.jpg' //data.flags.svg;
      const topLevelDomain = data.tld[0];
      const borderCountries = data.borders ? populateBorders(data.borders) : [];
      const currencies = Object.values(data.currencies)[0].name;

      const borderCountriesURI = borderCountries ? borderCountries.map(b => b.toLowerCase().replace(/\W+/g, '-')) : [];
      setData({
        countryName, nativeName,
        population, region,
        subRegion, capital,
        languages, flag,
        topLevelDomain, borderCountries,
        currencies, borderCountriesURI
      });
    }

    function populateBorders(borders) {
      return borders.map(b => countries.data.find(c => c.fifa === b)).filter(b => b !== undefined).map(b => b.name.common);
    }

    useEffect(() => {
      const { country } = router.query;
      if(!country) return;
      const _data = countries.data.find(c => c.name.common.toLowerCase() === country.replace(/\W+/g, ' ').toLowerCase());
      if(!_data) return;
      parseData(_data);
      setLoading(false);
    }, [router]);

    if(loading) {
      return <div className="loader-countries"><Loader /></div>;
    }

    return (
        <div className="details">
          <Head>
            <title>{data.countryName}</title>
            <link rel="icon" href="/favicon.png" />
          </Head>
            <div className="back">
                <Link href="/">
                    <a style={{ color: theme.text }} className="back-button">
                        <img
                          src='/right-arrow.svg'
                          width={25}
                          height={25}
                          alt="go back"
                          style={{ filter: `invert(${theme.mode})` }}
                         />
                        <span>back</span>
                    </a>
                </Link>
            </div>
            <div className="details-content">
                <div className="details-flag">
                    <img
                        src={data.flag}
                        alt={`flag of ${data.countryName}`}
                        width={300}
                        height={250}
                    />
                </div>
                <div className="details-summary">
                    <div className="country-name" style={{color: theme.text}}>{ data.countryName }</div>
                    <div className="country-info country-text">
                        <ul>
                            <li>
                                <span style={{ color: theme.text }}>Native Name:</span> <span style={{ color: theme.input }}>{data.nativeName}</span>
                            </li>
                            <li>
                                <span style={{color: theme.text}}>Population:</span> <span style={{ color: theme.input }}>{ data.population }</span>
                            </li>
                            <li><span style={{color: theme.text}}>Region:</span> <span style={{ color: theme.input }}>{ data.region }</span></li>
                            <li><span style={{ color: theme.text }}>Sub Region:</span> <span style={{ color: theme.input }}>{data.subRegion}</span></li>
                            <li><span style={{color: theme.text}}>Capital:</span> <span style={{ color: theme.input }}>{data.capital}</span></li>
                        </ul>

                        <ul>
                            <li>
                                <span style={{ color: theme.text }}>Top Level Domain:</span> <span style={{ color: theme.input }}>{data.topLevelDomain}</span>
                            </li>
                            <li><span style={{ color: theme.text }}>Currencies:</span> <span style={{ color: theme.input }}>{ data.currencies }</span></li>
                            <li><span style={{color: theme.text}}>Languages:</span> <span style={{ color: theme.input }}>{data.languages}</span></li>
                        </ul>
                    </div>
                    {data.borderCountries.length ?
                        <div className="border-countries">
                            <div className="border-country-title" style={{color: theme.text}}>
                                Border countries:
                            </div>
                            {data.borderCountries.map((country, i) => (
                                <Link href={`/${data.borderCountriesURI[i]}`} key={country}>
                                    <a style={{ color: theme.input, background: theme.foreground }}>{country}</a>
                                </Link>
                            ))}
                        </div> : null
                    }
                </div>
            </div>
        </div>
    );
}
