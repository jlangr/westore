import React, { Component } from 'react'
import { Form } from 'react-bootstrap'
import FormField from './FormField'

class AddSpace extends Component {
  render() {
    return (
      <code language="html">
        <div>
          <h1>WeStore</h1>
          <Form>
            <FormField label='City' bsClass='input-city'
              stateKey='city' parent={this} />
            <FormField label='Street Address' bsClass='input-street-address'
              stateKey='streetAddress' parent={this} />
          </Form>
        </div>
      </code>
    )
  }
}

export default AddSpace