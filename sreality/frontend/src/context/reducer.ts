
import * as React from 'react'
import { ActionType } from './ActionType'

// dispatch functions what will be called in actions
const reducer: React.Reducer<IState, IAction> = ( state: IState, action: IAction ) => {
    switch (action.type) {
        case ActionType.SET_LANGUAGE:
            return { ...state, language: action.language};
        case ActionType.SET_FLATS_COUNT:
            return { ...state, flatsCount: action.flatsCount};
        case ActionType.SET_FLATS:
            return { ...state, flats: action.flats};
        default: return state;
    }
}

export default reducer