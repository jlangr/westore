export const type = {
  AddValidation: 'ADD_VALIDATION',
  ClearFieldError: 'CLEAR_FIELD_ERROR',
  SetCurrentSpaceId: 'SET_CURRENT_SPACE_ID',
  SetCurrentSpaces: 'SET_CURRENT_SPACES',
  SetErrorMessage: 'SET_ERROR_MESSAGE',
  SetErrors: 'SET_ERRORS',
  SetFormField: 'SET_FORM_FIELD',
  SetValidations: 'SET_VALIDATIONS',
  ValidateSpaceFields: 'VALIDATE_SPACES'
}

export const initialState = { fields: {}, fieldErrors: {}, fieldValidations: [], currentSpaces: [] }

export const reducer = (state, action) => {
  switch(action.type) {
    case type.AddValidation: {
      const { fieldName, ...validation } = action.payload
      const newValidationsForField = [ ...state.fieldValidations[fieldName], validation ]
      return {...state, fieldValidations: {...state.fieldValidations, [fieldName]: newValidationsForField}}
    }

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
      const { field, value } = action.payload
      return { ...state, fields: {...state.fields, [field]: { value }} }
    }

    case type.SetCurrentSpaceId:
      return { ...state, currentSpaceId: action.payload }

    case type.SetErrorMessage:
      return { ...state, errorMessage: action.payload }

      // TODO test
    case type.SetErrors:
      return { ...state, fieldErrors: action.payload }

    case type.SetCurrentSpaces:
      return { ...state, currentSpaces: action.payload }

    default:
      return state
  }
}
