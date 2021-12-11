import React from 'react'
import { Options } from './Options'

const Select = ({ setCountry }) => {

    const changeCountry = (e) => {
        e.preventDefault();
        
        Options.forEach((option) => {
            if (option.country === e.target.value) {
                setCountry((prevState) => ({ ...prevState, ...option }));
                window.localStorage.setItem('country', option.country);
                window.localStorage.setItem('title', option.title);
            }
        });
    };

    return (
        <>
            <select onChange={changeCountry}>
                {Options.map((obj) => (
                    <option value={obj.country} key={obj.country}>{obj.title}</option>
                ))}
            </select>
        </>
    )
}

export default Select