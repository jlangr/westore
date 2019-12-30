import * as React from 'react'
import { Button, Form } from 'react-bootstrap'
import * as Actions from '../actions'
import FormField from './FormField'
import ErrorAlert from './ErrorAlert'
import { Store } from '../Store'

const AddSpace = () => {
  const { state, dispatch } = React.useContext(Store)

  return (
    <div>
      <Form>
        <FormField label='Street Address' bsClass='input-address' stateKey='address' required />
        <FormField label='City' bsClass='input-city' stateKey='city' required />
        <FormField label='ZIP Code' bsClass='input-zip-code' stateKey='zipCode' required/>
        <Button bsClass='button-submit'
          onClick={() => Actions.addSpaceIfValid(state, dispatch) }>Add</Button>
      </Form>
      <ErrorAlert />
    </div>
  )
}
export default AddSpace
