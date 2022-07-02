import React from "react";
import Desktop from "./Components/Desktop";
import Taskbar from "./Components/Taskbar";
import useAppInit from "./Hooks/useAppInit";
import Windows from "./Components/Windows";
import useHistory from "./Hooks/useHistory";

const App = () => {
    useHistory()
    useAppInit()
    return <React.Fragment>
        <Desktop/>
        <Windows/>
        <Taskbar/>
    </React.Fragment>
}

export default App;
