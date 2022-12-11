import Snowfall from "react-snowfall";
import React, {useEffect} from "react";

const SnowfallWrapper = () => {
    useEffect(() => {

    }, [])
    return <Snowfall
            style={{
            position: 'fixed',
                width: '100vw',
                height: '100vh',
        }}
    />
}

export default SnowfallWrapper