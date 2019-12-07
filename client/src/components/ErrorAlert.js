import * as React from 'react'
import { Alert } from 'react-bootstrap'
import { clearErrorMessage } from '../actions'
import { Store } from '../Store'

const ErrorAlert = () => {
  const { state, dispatch } = React.useContext(Store)
  if (state.errorMessage)
    return (
      <Alert className='alert-danger'
        onDismiss={ () => dispatch(clearErrorMessage()) }>
        {state.errorMessage}
      </Alert>
    )
  return null
}

export default ErrorAlert
