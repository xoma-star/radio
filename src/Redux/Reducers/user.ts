interface State {
    authorized: boolean
}

export enum UserActionTypes{
    SET_AUTHORIZED = "SET_AUTHORIZED"
}

const defaultState: State = {
    authorized: false
}

interface AuthorizedAction{
    type: UserActionTypes.SET_AUTHORIZED,
    payload: boolean
}

export type UserAction = AuthorizedAction

export const UserReducer = (state: State = defaultState, action: UserAction) => {
    switch (action.type){
        case UserActionTypes.SET_AUTHORIZED: return {...state, authorized: action.payload}
        default: return state
    }
}