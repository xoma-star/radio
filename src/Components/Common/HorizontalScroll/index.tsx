import './HorizontalScroll.css'
import React from "react";

interface props{
    children?: React.ReactNode
}

const HorizontalScroll = ({children}: props) => {
    return <div className={'horizontal-scroll'}>{children}</div>
}

export default HorizontalScroll