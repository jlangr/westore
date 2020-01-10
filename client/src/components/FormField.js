import * as React from 'react'
import {FormControl} from 'react-bootstrap'
import {addValidations, clearFieldError, setFieldValue} from '../actions'

import {Store} from '../Store'

const FormField = props => {
  const {state, dispatch} = React.useContext(Store)

  // TODO move logic to validation and test
  React.useEffect(() => addValidations(dispatch, props), [dispatch])

  return (
    <div className='field'>
      <label>{props.label}</label>
      <FormControl
        bsClass={props.bsClass}
        onFocus={_ => dispatch(clearFieldError(props.stateKey))}
        onChange={event => dispatch(setFieldValue(props.stateKey, event.target.value))}/>
      <br/>
      <label className='errorMessage'>{state.fieldErrors[props.stateKey]}</label>
    </div>)
}
export default FormField
