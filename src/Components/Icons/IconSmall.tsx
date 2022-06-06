interface props{
    width?: number,
    height?: number,
    className?: string,
    src: string
}

const IconSmall = ({width = 16, height = 16, className, src}: props) => {
    return <img
        alt={'icon'}
        className={className}
        width={width}
        height={height}
        src={src}/>
}

export default IconSmall