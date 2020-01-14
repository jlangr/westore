import * as React from 'react'
import { FormControl } from 'react-bootstrap'
import * as Actions from '../actions'

import { Store } from '../Store'

export const lines = messages =>
  messages && messages.length > 0
    ? (<div>{messages.map(msg => { return (<div key={1}>{msg}</div>) })}</div>)
    : undefined

const FormField = props => {
  const { state, dispatch } = React.useContext(Store)

  // TODO this causes a warning due to props not in the dependencies array
  // It does infinite recursive rerendering if props is in the array, since
  // it changes each render
  React.useEffect(() => Actions.registerValidations(dispatch, props), [dispatch])

  return (
    <div className='field'>
      <label>{props.label}</label>
      <FormControl
        bsClass={props.bsClass}
        onFocus={_ => dispatch(Actions.clearFieldError(props.stateKey))}
        onChange={event => dispatch(Actions.setFieldValue(props.stateKey, event.target.value))}/>
      <br/>
      <label className='errorMessage'>{lines(state.fieldErrors[props.stateKey])}</label>
    </div>)
}
export default FormField
