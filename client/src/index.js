import React from 'react'
import { render } from 'react-dom'
import AddSpace from './components/AddSpace'
import * as Actions from './actions'

render(<AddSpace submitFn={Actions.submit}/>, document.getElementById('root'))