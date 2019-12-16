import * as Validation from '../validations/validation'

export const type = {
  ClearFieldError: 'CLEAR_FIELD_ERROR',
  SetCurrentSpaceId: 'SET_CURRENT_SPACE_ID',
  SetCurrentSpaces: 'SET_CURRENT_SPACES',
  SetErrorMessage: 'SET_ERROR_MESSAGE',
  SetFormField: 'SET_FORM_FIELD',
  SetValidations: 'SET_VALIDATIONS',
  ValidateSpaceFields: 'VALIDATE_SPACES'
}

export const initialState = { fields: {}, fieldErrors: {}, fieldValidations: [], currentSpaces: [] }

const validateFieldHasContent = (state, fieldName) => {
  if (Validation.hasContent(state.fields[fieldName]))
    return state

  return { ...state, fieldErrors: { ...state.fieldErrors, [fieldName]: 'Required' } }
}

export const reducer = (state, action) => {
  switch(action.type) {
    case type.ClearFieldError: {
      const fieldNameForWhichToRemoveErrors = action.payload
      const { [fieldNameForWhichToRemoveErrors]:_, ...restOfErrors } = state.fieldErrors
      return { ...state, fieldErrors: restOfErrors }
    }

    case type.SetValidations: {
      const { field, validationFns } = action.payload
      return { ...state, fieldValidations: { ...state.fieldValidations, [field]: validationFns } }
    }

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

    case type.ValidateSpaceFields: {
      let newState = { ...state }
      newState = validateFieldHasContent(newState, 'city')
      newState = validateFieldHasContent(newState, 'address')
      // console.log('->', newState)
      return newState
    }

    default:
      return state
  }
}
