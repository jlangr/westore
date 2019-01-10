import React, { Component } from 'react'
import { Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

class AddSpace extends Component {
  render() {
    return (
      <div>
        <h1>WeStore</h1>
        <Form>
          <FormGroup>
            <ControlLabel>Address</ControlLabel>
            <FormControl
              className='input-street-address'
              onChange={ event => this.setState({ streetAddress: event.target.value }) }
            />
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default AddSpace