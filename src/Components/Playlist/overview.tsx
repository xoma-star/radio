import {useTypedSelector} from "../../Hooks/useTypedSelector";
import {useEffect} from "react";

const PlaylistOverview = () => {
    const {overview} = useTypedSelector(s => s.playlist)
    useEffect(() => {}, [overview])

    return <div>{overview}</div>
}

export default PlaylistOverview