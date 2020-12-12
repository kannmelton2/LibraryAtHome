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

import AddBorrower from '../components/pages/AddBorrower/AddBorrower';
import Auth from '../components/pages/Auth/Auth';
import BrowseBooks from '../components/pages/BrowseBooks/BrowseBooks';
import Home from '../components/pages/Home/Home';
import MyNavbar from '../components/shared/MyNavbar/MyNavbar';
import RegisterUser from '../components/pages/RegisterUser/RegisterUser';

fbConnection();

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === false
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};
const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

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
                <PrivateRoute path='/home' component={Home} authed={authed} />
                <PublicRoute path="/register" component={RegisterUser} authed={authed} />
                <PublicRoute path="/auth" component={Auth} authed={authed} />
                <PrivateRoute path="/browse-books" component={BrowseBooks} authed={authed} />
                <PrivateRoute path="/add-borrower" component={AddBorrower} authed={authed} />
                <Redirect from="*" to="/home" />
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
