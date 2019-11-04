import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import AddSpace from './components/AddSpace'
import * as Actions from './actions'
import reducers from './reducers'

render(
  <Provider store={createStore(reducers)}>
    <AddSpace submitFn={Actions.submit}/>
  </Provider>,
  document.getElementById('root'))
