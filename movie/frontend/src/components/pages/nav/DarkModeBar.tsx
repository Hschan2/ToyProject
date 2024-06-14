import React from 'react'
import { DarkModeContainer, Toggle, Label, Indicator, Slider } from '../../../style/DarkMode';

type DarkModeProps = {
    handleChange: () => void;
    isChecked: boolean;
}

function DarkModeBar({ handleChange, isChecked }: DarkModeProps) {
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