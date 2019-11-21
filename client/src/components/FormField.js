import React from 'react'
import { FormControl } from 'react-bootstrap'
import { storeContext } from '../StoreContext'
import { setFieldValue } from '../actions'

const FormField = props => {
  const { dispatch } = storeContext()
  return (
    <div className='field'>
      <label>{props.label}</label>
      <FormControl
        bsClass={props.bsClass}
        onChange={event => dispatch(setFieldValue(props.stateKey, event.target.value))} />
    </div>
  )
}
export default FormField
