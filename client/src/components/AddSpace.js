import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { storeContext } from '../StoreContext'
import * as Actions from '../actions'
import FormField from './FormField'
import ErrorAlert from './ErrorAlert'

const AddSpace = () => {
  const { state, dispatch } = storeContext()

  return (
    <code language="html">
      <div>
        <h1>WeStore</h1>
        <Form>
          <FormField label='City' bsClass='input-city' stateKey='city' />
          <FormField label='Street Address'
            bsClass='input-street-address'
            stateKey='streetAddress' />
          <Button bsClass='button-submit'
            onClick={() => Actions.postSpace(state, dispatch)}>Add</Button>
        </Form>
        <ErrorAlert />
      </div>
    </code>
  )
}
export default AddSpace
