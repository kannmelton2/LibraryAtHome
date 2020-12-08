import React from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import 'firebase/auth';
import firebase from 'firebase/app';

import './App.scss';

import fbConnection from '../helpers/data/connection';

import AddNewLibrary from '../components/pages/AddNewLibrary/AddNewLibrary';
import Auth from '../components/pages/Auth/Auth';
import Home from '../components/pages/Home/Home';
import MyNavbar from '../components/shared/MyNavbar/MyNavbar';
import RegisterUser from '../components/pages/RegisterUser/RegisterUser';

fbConnection();

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.RemoveListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.RemoveListener();
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
                <Route path="/register" component={RegisterUser} authed={authed} />
                <Route path="/add-new-library" component={AddNewLibrary} authed={authed} />
                <Route path="/auth" component={Auth} authed={authed}/>
                { authed ?
                <Redirect from="*" to="/home" />
                :
                <Redirect from= "*" to="/register"/>
                }
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
