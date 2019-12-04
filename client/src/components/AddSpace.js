import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { storeContext } from '../StoreContext'
import * as Actions from '../actions'
import FormField from './FormField'
import ErrorAlert from './ErrorAlert'

const AddSpace = () => {
  const { state, dispatch } = storeContext()

  const validate = (dispatch) => {
    dispatch(Actions.validateSpaceFields())
  }

  return (
    <div>
      <Form>
        <FormField label='Street Address'
          bsClass='input-street-address'
          stateKey='streetAddress' />
        <FormField label='City' bsClass='input-city' stateKey='city' />
        <Button bsClass='button-submit'
          onClick={() => { validate(dispatch); Actions.postSpace(state, dispatch) }}>Add</Button>
      </Form>
      <ErrorAlert />
    </div>
  )
}
export default AddSpace
