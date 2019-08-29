import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap'
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
            {/* START:existing-jsx */}
            <Button bsClass='button-submit'
              onClick={() => this.props.submitFn(this.state)}>
              Add
            </Button>
            {/* END:existing-jsx */}
          </Form>
        </div>
      </code>
    )
  }
}

export default AddSpace