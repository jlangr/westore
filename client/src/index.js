import React from 'react'
import ReactDOM from 'react-dom'
import AddSpace from './components/AddSpace'
import ListSpaces from './components/ListSpaces'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

import { StoreProvider } from './Store'

ReactDOM.render(
  <StoreProvider><AddSpace/><ListSpaces /></StoreProvider>,
  document.getElementById('root'))
