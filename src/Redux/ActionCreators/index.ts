import * as UICreators from "./ui";
import * as PlayerCreators from './player'
import * as UserCreators from './user'

const e = {
    ...UICreators,
    ...PlayerCreators,
    ...UserCreators
}

export default e