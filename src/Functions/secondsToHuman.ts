const secondsToHuman = (time: number): string => {
    let hours = Math.floor(time / 3600);
    time = time - hours * 3600;
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time - minutes * 60)
    return `${hours > 0 ? hours + ':' : ''}${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
}

export default secondsToHuman