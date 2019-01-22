import React, { Component } from 'react'
import { Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

class AddSpace extends Component {
  render() {
    // START:changed-jsx
    return (
      <div>
        <h1>WeStore</h1>
        <Form>
          <FormGroup>
            <ControlLabel>Address</ControlLabel>
            <FormControl
              className='input-street-address'
              onChange={ event =>
                this.setState({ streetAddress: event.target.value }) }
            />
          </FormGroup>
          {/* START_HIGHLIGHT */}
          <FormGroup>
            <ControlLabel>Address</ControlLabel>
            <FormControl
              className='input-city'
              onChange={ event =>
                this.setState({ city: event.target.value }) }
            />
          </FormGroup>
          {/* END_HIGHLIGHT */}
        </Form>
      </div>
    )
    // END:changed-jsx
  }
}

export default AddSpace