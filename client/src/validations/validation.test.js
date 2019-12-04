import * as Validation from './validation'

describe('hasContent', () => {
  it('answers true when field contains anything', () => {
    expect(Validation.hasContent('abc')).toBeTruthy()
  })
})