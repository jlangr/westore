import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { StoreProvider } from './Store'
import App from './components/App'

ReactDOM.render(
  <StoreProvider><App /></StoreProvider>,
  document.getElementById('root'))
