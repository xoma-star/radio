import React from "react";
import './Group.css'

interface props{
    header?: string,
    children?: React.ReactNode
}

const Group = ({children, header}: props) => {
    return <div className={'group'}>
        <div className={'group-header'}>{header}</div>
        <div>{children}</div>
    </div>
}

export default Group