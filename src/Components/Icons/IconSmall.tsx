interface props{
    width?: number,
    height?: number,
    className?: string,
    src: string,
    rounded?: boolean
}

const IconSmall = ({width = 16, height = 16, className, src, rounded}: props) => {
    return <img
        style={rounded ? {borderRadius: '50%'} : {}}
        crossOrigin={'use-credentials'}
        draggable={false}
        alt={'icon'}
        className={className}
        width={width}
        height={height}
        src={src}/>
}

export default IconSmall