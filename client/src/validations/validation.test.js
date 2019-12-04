import * as Validation from './validation'

describe('hasContent', () => {
  it('answers true when field contains anything', () => {
    expect(Validation.hasContent('abc')).toBeTruthy()
  })

  it('answers false when field is undefined or null', () => {
    expect(Validation.hasContent(null)).toBeFalsy()
    expect(Validation.hasContent(undefined)).toBeFalsy()
  })

  it('answers false when field is a zero-length string', () => {
    expect(Validation.hasContent('')).toBeFalsy()
  })

  it('answers false when field is an empty string', () => {
    expect(Validation.hasContent(' ')).toBeFalsy()
  })
})