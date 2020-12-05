import React from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import './App.scss';

import Auth from '../components/pages/Auth/Auth';
import Home from '../components/pages/Home/Home';
import MyNavbar from '../components/shared/MyNavbar/MyNavbar';

class App extends React.Component {
  state = {
    authed: true,
  }
  render() {
    const { authed } = this.state;
    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar authed={authed} />
            <div className="container">
              <div className="row">
              <Switch>
                <Route path='/home' component={Home} authed={authed} />
                <Route path="/auth" component={Auth} authed={authed}/>
                <Redirect from= "*" to="/home"/>
              </Switch>
              </div>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }

}

export default App;
