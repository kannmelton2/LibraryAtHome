import React from 'react';
import { Link } from 'react-router-dom';

import authData from '../../../helpers/data/authData';

import './RegisterUser.scss';

class RegisterUser extends React.Component {
    state = {
        userFirstName: '',
        userLastName: '',
        userEmail: '',
        userPassword: '',
        librarysName: ``,
         }

    libraryNameChange = (e) => {
      e.preventDefault();
      this.setState({ librarysName: e.target.value });
    }

    firstNameChange = (e) => {
        e.preventDefault();
        this.setState({ userFirstName: e.target.value});
    }
        
    lastNameChange = (e) => {
        e.preventDefault();
        this.setState({ userLastName: e.target.value});
    }

    emailChange = (e) => {
        e.preventDefault();
        this.setState({ userEmail: e.target.value});
      }
    
      passwordChange = (e) => {
        e.preventDefault();
        this.setState({ userPassword: e.target.value});
      }

      saveNewUser = (e) => {
        e.preventDefault();
        const {
          userFirstName,
          userLastName,
          userEmail,
          userPassword,
          librarysName,
        } = this.state;
    
    const newUser = {
        firstName: userFirstName,
        lastName: userLastName,
        email:  userEmail,
        password:  userPassword,
        libraryName: librarysName,
    };

    authData.registerUser(newUser)
    .then(() => this.props.history.push('/home'))
    .catch((err) => console.error('unable to add new User'))
    }

    render() {
        const {
            userFirstName,
            userLastName,
            userEmail,
            userPassword,
            librarysName,
        } = this.state;

        return(
            <div className="RegisterUser d-flex flex-wrap justify-content-center text-left">
              <header className="page-header">
                <h1>Welcome to Library At Home</h1>
                <p>Please log in register to make use of our services:</p>
              </header>
      <form className="register-form">
        <div className="form-group">
        <label htmlFor="user-first-name">First Name</label>
      <input
        type="text"
        className="form-control"
        id="user-first-name"
        value={userFirstName}
        onChange={this.firstNameChange}
        />
        </div>
        <div className="form-group">
        <label htmlFor="user-last-name">Last Name</label>
      <input
        type="text"
        className="form-control"
        id="user-last-name"
        value={userLastName}
        onChange={this.lastNameChange}
        />
        </div>
        <div className="form-group">
        <label htmlFor="library-name">Library Name</label>
      <input
        type="text"
        className="form-control"
        id="library-name"
        value={librarysName}
        onChange={this.libraryNameChange}
        />
        </div>
        <div className="form-group">
        <label htmlFor="user-email">Email</label>
      <input
        type="email"
        className="form-control"
        id="user-email"
        value={userEmail}
        onChange={this.emailChange}
        />
        </div>
        <div className="form-group">
        <label htmlFor="user-password">Password</label>
      <input
        type="password"
        className="form-control"
        id="user-password"
        value={userPassword}
        onChange={this.passwordChange}
        />
        </div>
        <Link className="btn dark-pink-btn m-2" to="/auth">Log in</Link>
        <button className="btn dark-green-btn m-2" onClick={this.saveNewUser}>Save New User</button>
      </form>
            </div>
        )
    }
}

export default RegisterUser;