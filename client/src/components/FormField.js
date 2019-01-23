import React, { Component } from 'react'
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

class FormField extends Component {
  render() {
    return (
      <FormGroup>
        <ControlLabel>{this.props.label}</ControlLabel>
        <FormControl
          bsClass={this.props.bsClass}
          onChange={event =>
            this.props.parent.setState({ [this.props.stateKey ]: event.target.value })
          }
        />
      </FormGroup>
    )
  }
}

export default FormField
