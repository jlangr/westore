import * as Validation from '../validations/validation'

export const type = {
  SetCurrentSpaceId: 'SET_CURRENT_SPACE_ID',
  SetCurrentSpaces: 'SET_CURRENT_SPACES',
  SetErrorMessage: 'SET_ERROR_MESSAGE',
  SetFormField: 'SET_FORM_FIELD',
  ValidateSpaceFields: 'VALIDATE_SPACES'
}

export const initialState = { fields: {}, fieldErrors: {}, currentSpaces: [] }

export const reducer = (state, action) => {
  switch(action.type) {
    case type.SetFormField: {
      const fieldKeyAndValue = action.payload
      const updatedFields = Object.assign(state.fields, fieldKeyAndValue)
      return { ...state, fields: updatedFields }
    }

    case type.SetCurrentSpaceId:
      return { ...state, currentSpaceId: action.payload }

    case type.SetErrorMessage:
      return { ...state, errorMessage: action.payload }

    case type.SetCurrentSpaces:
      return { ...state, currentSpaces: action.payload }

    case type.ValidateSpaceFields:
      if (!Validation.hasContent(state.fields['city'])) {
        return { ...state,
          fieldErrors: { ...state.fieldErrors, ['city']: 'Required' }
        }
      }
      return { ...state, fieldErrors: { ...state.fieldErrors, ['city']: undefined } }

    default:
      return state
  }
}
