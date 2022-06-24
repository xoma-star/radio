import React from "react";
import Desktop from "./Components/Desktop";
import Taskbar from "./Components/Taskbar";
import useAppInit from "./Hooks/useAppInit";
import Windows from "./Components/Windows";

const App = () => {
    useAppInit()
    return <React.Fragment>
        <Desktop/>
        <Windows/>
        <Taskbar/>
    </React.Fragment>
}

export default App;
