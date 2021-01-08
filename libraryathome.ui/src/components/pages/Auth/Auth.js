import React from 'react';
import { Link } from 'react-router-dom';


import './Auth.scss';

import authRequests from '../../../helpers/data/authData';

class Auth extends React.Component {
  state = {
    user: {
      email: '',
      password: '',
    },
  };

  loginClickEvent = (e) => {
    const { user } = this.state;
    e.preventDefault();
    authRequests
      .loginUser(user)
      .then(() => {
        this.props.history.push('/users');
      })
      .catch(error => {
        console.error('there was an error logging in', error);
      });
  };

  emailChange = e => {
    const tempUser = { ...this.state.user };
    tempUser.email = e.target.value;
    this.setState({ user: tempUser });
  };

  passwordChange = e => {
    const tempUser = { ...this.state.user };
    tempUser.password = e.target.value;
    this.setState({ user: tempUser });
  };

  render () {
    const { user } = this.state;
    return (
      <div className="Auth">
        <div id="login-form" className="d-flex flex-wrap text-center justify-content-center">
          <h1 className="text-center">Login</h1>
          <p className="form-header"></p>
          <form className="form-horizontal justify-content">
            <div className="form-group">
              <label htmlFor="inputEmail" className="control-label">
                Email:
              </label>
              <div>
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail"
                  placeholder="Email"
                  value={user.email}
                  onChange={this.emailChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputPassword" className="control-label">
                Password:
              </label>
              <div>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  placeholder="Password"
                  value={user.password}
                  onChange={this.passwordChange}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="text-center">
                <Link to="/register">Register</Link>
              </div>
            </div>
            <div className="form-group">
              <div>
                <button
                  type="submit"
                  className="btn dark-green-btn"
                  onClick={this.loginClickEvent}
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Auth;