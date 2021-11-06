import React from 'react'
import { Options } from './Options'

const Select = ({ setCountry, setTitle }) => {

    const changeCountry = (e) => {
        e.preventDefault();
        setCountry(e.target.value);

        Options.map((obj) => {
            if (obj.country === e.target.value) {
                setTitle(obj.title);
            }
        });
    };

    return (
        <>
            <select onChange={changeCountry}>
                {Options.map((country, index) => (
                    <option value={country.country} key={index}>{country.title}</option>
                ))}
            </select>
        </>
    )
}

export default Select