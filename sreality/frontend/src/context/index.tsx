import { createContext, useReducer } from 'react'

import createActions from './createActions'
import reducer from './reducer'
import initialState from './initialState'

export const Context = createContext(initialState);

export const Store = ({children}: IStoreProps) => {

    const [state, dispatch] = useReducer(reducer, initialState)
    const actions = createActions(dispatch)

    return (
        // @ts-ignore
        <Context.Provider value={{state, actions}}>
            {children}
        </Context.Provider>
    )
}