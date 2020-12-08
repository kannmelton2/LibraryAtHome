import React from 'react';
import firebase from 'firebase';

import libraryData from '../../../helpers/data/libraryData';
import userData from '../../../helpers/data/userData';

import './AddNewLibrary.scss';

class AddNewLibrary extends React.Component {
    state = {
        librarysName: '',
        user: [],
    }

    componentDidMount() {
        var authedUser = firebase.auth().currentUser;
        let email = '';
        
        if (authedUser != null) {
          email = authedUser.email;
          console.log('authed user', authedUser.email);

        }
        userData.getUserByEmail(email)
        .then(user => { this.setState({ user }) })
      }

    libraryNameChange = (e) => {
        e.preventDefault();
        this.setState({ librarysName: e.target.value});
      }

      createNewLibrary = (e) => {
        e.preventDefault();
        // const {
        //   librarysName,
        //   user,
        // } = this.state;
    
        const newLibrary = {
        libraryName: this.state.librarysName,
        userId: this.state.user.userId,
        };

    libraryData.addNewLibrary(newLibrary)
    .then(() => this.props.history.push('/home'))
    .catch((err) => console.error('unable to add new Library', err))
    }

    render() {
        return(
            <div className="AddNewLibrary">
                <form className="col-6 offset-3 text-left">
                    <div className="form-group">
                        <label htmlFor="library-name">Give Your Library A Name</label>
                            <input
                            type="text"
                            className="form-control"
                            id="library-name"
                            value={this.state.librarysName}
                            onChange={this.libraryNameChange}
                            />
                    </div>
                    <button className="btn btn-primary m-2" onClick={this.createNewLibrary}>Make My Library</button>
                </form>
            </div>
        )
    }
}

export default AddNewLibrary;
