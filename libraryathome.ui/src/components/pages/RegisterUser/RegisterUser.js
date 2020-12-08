import React from 'react';
import { Link } from 'react-router-dom';

import authData from '../../../helpers/data/authData';

import './RegisterUser.scss';

class RegisterUser extends React.Component {
    state = {
        newFirstName: '',
        newLastName: '',
        newEmail: '',
        newPassword: '',
        newLibraryName: '',
         }

    newFirstName = (e) => {
        e.preventDefault();
        this.setState({ newFirstName: e.target.value});
    }
        
    newLastName = (e) => {
        e.preventDefault();
        this.setState({ newLastName: e.target.value});
    }

    newEmail = (e) => {
        e.preventDefault();
        this.setState({ newEmail: e.target.value});
      }
    
      newPassword = (e) => {
        e.preventDefault();
        this.setState({ newPassword: e.target.value});
      }

      saveNewUser = (e) => {
        e.preventDefault();
        const {
          newFirstName,
          newLastName,
          newEmail,
          newPassword,
        } = this.state;
    
    const newUser = {
        firstName: newFirstName,
        lastName: newLastName,
        email:  newEmail,
        password:  newPassword,
    };

    authData.registerUser(newUser)
    .then(() => this.props.history.push('/add-new-library'))
    .catch((err) => console.error('unable to add new User'))
    }

    render() {
        const {
            newFirstName,
            newLastName,
            newEmail,
            newPassword,
        } = this.state;

        return(
            <div className="RegisterUser">
                <h1>Welcome to Library At Home</h1>
                <p>Please log in register to make use of our services:</p>
      <form className="col-6 offset-3 text-left">
        <div className="form-group">
        <label htmlFor="new-first-name">First Name</label>
      <input
        type="text"
        className="form-control"
        id="new-name"
        value={newFirstName}
        onChange={this.newFirstName}
        />
        </div>
        <div className="form-group">
        <label htmlFor="new-last-name">Last Name</label>
      <input
        type="text"
        className="form-control"
        id="new-last-name"
        value={newLastName}
        onChange={this.newLastName}
        />
        </div>
        <div className="form-group">
        <label htmlFor="new-email">Email</label>
      <input
        type="email"
        className="form-control"
        id="new-email"
        value={newEmail}
        onChange={this.newEmail}
        />
        </div>
        <div className="form-group">
        <label htmlFor="new-password">Password</label>
      <input
        type="password"
        className="form-control"
        id="new-password"
        value={newPassword}
        onChange={this.newPassword}
        />
        </div>
        <Link className="btn btn-dark m-2" to="/auth">Log in</Link>
        <button className="btn btn-primary m-2" onClick={this.saveNewUser}>Save New User</button>
      </form>
            </div>
        )
    }
}

export default RegisterUser;