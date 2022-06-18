import React, { useContext } from 'react'
import PropTypes from 'prop-types';
import Image from 'next/image'
import ThemeContext from './ThemeContext'

export default function Country({ countryName, population, region, capital, flag }) {
    const [theme] = useContext(ThemeContext);
    return (
        <div className="country" style={{
            background: theme.foreground,
            color: theme.input,

        }}>
            <Image
                src={flag}
                alt="Flag"
                width={300}
                height={200}
                className="flag"
            />
            <div className="country-name" style={{color: theme.text}}>
                {countryName}
            </div>
            <div className="country-text">
                <span style={{color: theme.text}}>Population: </span>
                <span>{population}</span>
            </div>
            <div className="country-text">
                <span style={{color: theme.text}}>Region: </span>
                <span>{region}</span>
            </div>
            <div className="country-text">
                <span style={{color: theme.text}}>Capital: </span>
                <span>{capital}</span>
            </div>
        </div>
    )
}

Country.propTypes = {
    countryName: PropTypes.string.isRequired,
    population: PropTypes.string.isRequired,
    region: PropTypes.string.isRequired,
    capital: PropTypes.string.isRequired,
    flag: PropTypes.string.isRequired
}

Country.defaultProps = {
    countryName: 'Germany',
    population: '81,770,900',
    region: 'Europe',
    capital: 'Berlin',
    flag: '/flag.jpg'
}
