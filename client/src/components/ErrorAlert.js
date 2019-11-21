import React from 'react'
import { Alert } from 'react-bootstrap'
import { clearErrorMessage } from '../actions'

import { storeContext } from '../StoreContext'

const ErrorAlert = () => {
  const { state, dispatch } = storeContext()
  if (state.errorMessage)
    return (
      <Alert className='alert-danger'
        onDismiss={ () => dispatch(clearErrorMessage())}>
        {state.errorMessage}
      </Alert>
    )
  return null
}

export default ErrorAlert
