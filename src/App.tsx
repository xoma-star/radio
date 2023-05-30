import React from "react";
import Desktop from "./Components/Desktop";
import Taskbar from "./Components/Taskbar";
import useAppInit from "./Hooks/useAppInit";
import Windows from "./Components/Windows";
import useHistory from "./Hooks/useHistory";
//import Snowfall from "react-snowfall";
//import useSnowEffect from "./Hooks/useSnowEffect";

const App = () => {
    useHistory()
    useAppInit()
    //const snow = useSnowEffect()
    return <React.Fragment>
        <Desktop/>
        <Windows/>
        <Taskbar/>
        {/*<Snowfall
            snowflakeCount={snow.count}
            speed={snow.speed}
            wind={snow.wind}
            radius={snow.radius}
            style={{
                position: 'fixed',
                width: '100vw',
                height: '100vh',
            }}
        />*/}
    </React.Fragment>
}

export default App;
