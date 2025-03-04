import { DarkModeContainer, Toggle, Label, Indicator, Slider } from './style/dark-mode-style';

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