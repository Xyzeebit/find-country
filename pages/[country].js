import { useRouter } from "next/router";
import Image from 'next/image'
import Link from 'next/link'
import { useContext } from "react";
import ThemeContext from "../components/ThemeContext";


export default function Details({ data }) {
    const router = useRouter();
    const [theme] = useContext(ThemeContext);
    // console.log(router)
    return (
        <div className="details">
            <div className="back">
                <Link href="/">
                    <a style={{ color: theme.text }} className="back-button">
                        <Image
                          src='/right-arrow.svg'
                          width={25}
                          height={25}
                          alt="go back"
                         />
                        <span>back</span>
                    </a>
                </Link>
            </div>
            <div className="details-content">
                <div className="details-flag">
                    <Image
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
                    {data.borderCountries &&
                        <div className="border-countries">
                            <div className="border-country-title" style={{color: theme.text}}>
                                Border countries:
                            </div>
                            {data.borderCountries.map((country) => (
                                <Link href={`/${country}`} key={country}>
                                    <a style={{ color: theme.input, background: theme.foreground }}>{country}</a>
                                </Link>
                            ))}
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export async function getStaticProps({ params }) {
    const data = {
        countryName:     params.country,
        nativeName:      'Dutch land',
        population:      '80,790,900',
        region:          'Europe',
        subRegion:       'Western Europe',
        capital:         'Berlin',
        flag:            '/flag.jpg',
        topLevelDomain:  'ge',
        currencies:      ['euro'],
        languages:        ['German'],
        borderCountries: ['belgium', 'france', 'poland', 'switzerland']
    };
    data['currencies'] = data.currencies.toString().split(',').join(', ');
    data['languages'] = data.languages.toString().split(',').join(', ');
    return {
        props: {
            data
        }
    }
}

export async function getStaticPaths() {
    // Get the paths we want to pre-render based on posts
    const route = 'germany'
    const paths = [{ params: { country: route, slug: 'ger' }}, { params: { country: 'belgium' }}];

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
}
