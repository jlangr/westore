import * as React from 'react'
import { Button, Form } from 'react-bootstrap'
import * as Actions from '../actions'
import FormField from './FormField'
import ErrorAlert from './ErrorAlert'
import { Store } from '../Store'

const AddSpace = () => {
  const { state, dispatch } = React.useContext(Store)

  const validate = (dispatch) => dispatch(Actions.validateSpaceFields())

  return (
    <div>
      <Form>
        <FormField label='Street Address' bsClass='input-address' stateKey='address' />
        <FormField label='City' bsClass='input-city' stateKey='city' />
        <Button bsClass='button-submit'
          onClick={() => {
            validate(dispatch)
            Actions.postSpace(state, dispatch) }}>Add</Button>
      </Form>
      <ErrorAlert />
    </div>
  )
}
export default AddSpace
