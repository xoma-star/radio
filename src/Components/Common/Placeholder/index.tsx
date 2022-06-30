import React from "react";
import './Placeholder.css'
import Title from "../Title";

interface props{
    src: string,
    header?: string,
    className?: string,
    style?: React.CSSProperties,
    fullScreen?: boolean,
    actions?: React.ReactNode,
    description?: string
}

const Placeholder = ({fullScreen, src, style, header, className, actions, description}: props) => {
    return <div className={`placeholder${className ? ` ${className}` : ''}${fullScreen ? ` fullScreen` : ''}`} style={style}>
        <img src={src} width={32} height={32} draggable={false}/>
        {header && <Title>{header}</Title>}
        {description && <span>{description}</span>}
        {actions && <div className={'actions'}>{actions}</div>}
    </div>
}

export default Placeholder