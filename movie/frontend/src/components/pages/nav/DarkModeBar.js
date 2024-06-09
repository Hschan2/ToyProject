import React from 'react'
import { DarkModeContainer, Toggle, Label, Indicator, Slider } from '../../../style/DarkMode';

function DarkModeBar({ handleChange, isChecked }) {
    return (
        <DarkModeContainer>
            <Toggle id="darkModeCheck" checked={isChecked} onChange={handleChange} />
            <Label htmlFor="darkModeCheck">
                <Indicator />
                <Slider checked={isChecked} />
            </Label>
        </DarkModeContainer>
    );
}

export default DarkModeBar