import React from 'react'
import { Alert } from 'react-bootstrap'
import { clearErrorMessage } from '../actions'

import { storeContext } from '../StoreContext'

// TODO test
const visibilityClassName = state =>
  state.errorMessage ? 'visible' : 'invisible'

// TODO danger not working, always blue
// TODO test
const ErrorAlert = () => {
  const { state, dispatch } = storeContext()
  return (
    <Alert className={visibilityClassName(state)}
      variant={'danger'}
      onDismiss={ () => clearErrorMessage(dispatch)}>
      {state.errorMessage}
    </Alert>
  )
}

export default ErrorAlert
