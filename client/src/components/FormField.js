import React from 'react'
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import { storeContext } from '../StoreContext'
import { setFieldValue } from '../actions'

const FormField = props => {
  const { dispatch } = storeContext()
  return (
    <FormGroup>
      <ControlLabel>{props.label}</ControlLabel>
      <FormControl
        bsClass={props.bsClass}
        onChange={event => setFieldValue(dispatch, props.stateKey, event.target.value)} />
    </FormGroup>
  )
}
export default FormField
