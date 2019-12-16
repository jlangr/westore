import * as React from 'react'
import { FormControl } from 'react-bootstrap'
import { clearFieldError, setValidations, setFieldValue } from '../actions'
import * as Validation from '../validations/validation'

import { Store } from '../Store'

const FormField = props => {
  const { state, dispatch } = React.useContext(Store)

  // DO once
  if (props.required)
    dispatch(setValidations(props.stateKey, [Validation.hasContent]))
  // React.useEffect(() => { Actions.getSpaces(dispatch) }, [dispatch])

  return (
    <div className='field'>
      <label>{props.label}</label>
      <FormControl
        bsClass={props.bsClass}
        onFocus={ _ => dispatch(clearFieldError(props.stateKey)) }
        onChange={ event => dispatch(setFieldValue(props.stateKey, event.target.value)) } />
      <br />
      <label className='errorMessage'>{state.fieldErrors[props.stateKey]}</label>
    </div>
  )
}
export default FormField
