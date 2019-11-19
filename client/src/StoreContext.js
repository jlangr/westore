import React from 'react'
import { Store } from './Store'

// TODO why a let
export let storeContext = () => React.useContext(Store)
