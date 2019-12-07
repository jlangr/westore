import * as React from 'react'

export default class ReactContextMock {
  constructor() {
    this.existingReactContext = React.useContext
    this.mockContext = React.useContext = jest.fn()
  }

  returnValue(value) {
    this.mockContext.mockReturnValue(value)
  }

  reset() {
    React.useContext = this.existingReactContext
  }
}
