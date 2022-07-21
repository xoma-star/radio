import React, {useEffect, useState} from 'react';
import './VolumeSlider.css';

interface props{
    volumeHandler: (volume: number) => void
}

const VolumeSlider = ({volumeHandler}: props) => {
    const [value, setValue] = useState(100)
    useEffect(() => {volumeHandler(value)}, [value])

    return (
        <input
            className={'volumeSlider'}
            type={'range'}
            min={0}
            max={100}
            step={1}
            style={{'--fill': `${value}%`} as React.CSSProperties}
            value={value}
            onChange={(e) => setValue(e.target.valueAsNumber)}
        />
    );
};

export default VolumeSlider;