import React, {Component} from 'react'
import NavBar from './NavBar'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './Home'
import AddSpace from './AddSpace'
import ListSpaces from './ListSpaces'

class App extends Component {
  render() {
    return (
      <div className={'App'}>
        <h1>WeStore</h1>
        <BrowserRouter>
          <NavBar/>
          <Switch>
            <Route exact path={'/'} component={Home}/>
            <Route path={'/space'} component={AddSpace}/>
            <Route path={'/spaces'} component={ListSpaces}/>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App

// TODO how to test