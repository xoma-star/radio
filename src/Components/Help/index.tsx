import {useState} from "react";
import HelpTree from "./tree";
import Title from "../Common/Title";
import help from "../../Constants/help";

const Help = () => {
    const [path, setPath] = useState('root')
    const data = help.find(s => s.id === path)

    return <div className="help" style={{display: 'flex'}}>
        <HelpTree onClick={setPath}/>
        <div style={{padding: 8, maxWidth: 300}}>
            <Title>{data?.title}</Title>
            {data?.text}
        </div>
    </div>
}

export default Help