import React from 'react'
import { useState, useEffect } from 'react'
import { Options } from './Options'

const Select = () => {
    const [country, setCountry] = useState("kr");

    const changeCountry = e => {
        setCountry(e.target.value)
    }

    useEffect(() => {
        console.log(country)
    }, [country])

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
