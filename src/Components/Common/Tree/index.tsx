import './Tree.css'
import React from "react";

interface TreeProps{
    children: React.ReactNode,
    topLevel?: boolean
}

interface TreeItemProps{
    label: string,
    children?: React.ReactNode,
    expandable?: boolean,
    expandedDefault?: boolean,
    onClick?: () => void
}

export const Tree = ({children, topLevel = false}: TreeProps) => {
    return <ul className={`tree-view${!topLevel ? ' no-borders' : ''}`}>{children}</ul>
}

export const TreeItem = ({label, children, expandable = false, expandedDefault = false, onClick}: TreeItemProps) => {
    const [expanded, setExpanded] = React.useState(expandedDefault)

    if(children) return <li className={'tree-item'} onClick={onClick}>
        {expandable ? <details open={expanded} onChange={() => setExpanded(r => !r)}>
            <summary>{label}</summary>
            {children}
        </details> : children}
    </li>

    return <li className={'tree-item'} onClick={onClick}>{label}</li>
}