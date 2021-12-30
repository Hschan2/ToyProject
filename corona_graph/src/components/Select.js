import React from 'react'
import { Options } from './Options'

const Select = ({ country, setCountry }) => {

    const changeCountry = (e) => {
        e.preventDefault();
        
        Options.forEach((option) => {
            if (option.country === e.target.value) {
                setCountry((prevState) => ({ ...prevState, ...option }));
                window.sessionStorage.setItem('country', option.country);
                window.sessionStorage.setItem('title', option.title);
            }
        });
    };

    return (
        <>
            <select onChange={changeCountry}>
                {Options.map((obj) => (
                    <option value={obj.country} key={obj.country} selected={obj.country == country ? 'selected' : ""}>{obj.title}</option>
                ))}
            </select>
        </>
    )
}

export default Select