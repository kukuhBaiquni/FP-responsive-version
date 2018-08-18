import React, { Component } from 'react';
import RegisterLoginPage from './Components/RegisterLoginPage'
// import './Header.css'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import MyProfile from './Components/MyProfile'
import HomePage from './Components/HomePage'
import TulisResepPage from './Components/TulisResepPage'
import Authentication from './Components/Authentication'
import ResepDetail from './Components/ResepDetail'

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/profile' component={MyProfile} />
            <Route path='/register&login' component={RegisterLoginPage} />
            <Route path='/tulisresep' component={TulisResepPage} />
            <Route path='/authentication' component={Authentication} />
            <Route path='/resep/:id' component={ResepDetail} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
