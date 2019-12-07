import * as React from 'react'
import * as Actions from '../actions'
import { Store } from '../Store'

export const spaceComponent = space =>
  (<tr key={space._id}>
    <td>{space.address}</td>
    <td>{space.city}</td>
  </tr>)

const ListSpaces = () => {
  const {state, dispatch} = React.useContext(Store)

  React.useEffect(() => { Actions.getSpaces(dispatch) }, [dispatch])

  // TODO headers should be dynamic
  return (
    <div>
      <table>
        <thead><tr><td>Address</td><td>City</td></tr></thead>
        <tbody>{state.currentSpaces.map(spaceComponent)}</tbody>
      </table>
    </div>
  )
}

export default ListSpaces