import React from 'react'
import { reducer, initialState } from './reducers'

export const Store = React.createContext({})

export const StoreProvider = props => {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  return <Store.Provider value={{ state, dispatch }}>{props.children}</Store.Provider>
}
