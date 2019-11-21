export const type = {
  SetCurrentSpaceId: 'SET_CURRENT_SPACE_ID',
  SetCurrentSpaces: 'SET_CURRENT_SPACES',
  SetErrorMessage: 'SET_ERROR_MESSAGE',
  SetFormField: 'SET_FORM_FIELD'
}

export const initialState = { fields: {}, currentSpaces: [] }

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

    default:
      return state
  }
}
