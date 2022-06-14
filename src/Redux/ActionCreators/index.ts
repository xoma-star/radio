import * as UICreators from "./ui";
import * as PlayerCreators from './player'
import * as UserCreators from './user'
import * as PlaylistCreators from './playlist'

const e = {
    ...UICreators,
    ...PlayerCreators,
    ...UserCreators,
    ...PlaylistCreators
}

export default e