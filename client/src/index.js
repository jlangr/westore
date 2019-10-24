import React from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import AddSpace from './components/AddSpace'
import * as Actions from './actions'

const reducer = (state={}, _) => state

const reducers = combineReducers({ reducer })

render(
  <Provider store={createStore(reducers)}>
    <AddSpace submitFn={Actions.submit}/>
  </Provider>,
  document.getElementById('root'))
