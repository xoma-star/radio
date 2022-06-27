import './HorizontalScroll.css'
import React from "react";

interface props{
    children?: React.ReactNode,
    maxWidth?: number
}

const HorizontalScroll = ({children, maxWidth}: props) => {
    return <div style={{maxWidth}} className={'horizontal-scroll'}>{children}</div>
}

export default HorizontalScroll