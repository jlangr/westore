import React from 'react'
import ReactDOM from 'react-dom'
import AddSpace from './components/AddSpace'
import 'bootstrap/dist/css/bootstrap.min.css'

import { StoreProvider } from './Store'

ReactDOM.render(
  <StoreProvider><AddSpace/></StoreProvider>,
  document.getElementById('root'))
