import React from 'react';
import firebase from 'firebase';

import borrowerData from '../../../helpers/data/borrowerData';
import userData from '../../../helpers/data/userData';

import SecondaryNav from '../../shared/SecondaryNav/SecondaryNav';

import './AddBorrower.scss';

class AddBorrower extends React.Component {
    state = {
        user: {},
        borrowerFirstName: '',
        borrowerLastName: '',
        borrowerEmail: '',
    }

    getUser = () => {
        const user = firebase.auth().currentUser;
        console.log('current user:', user.email);
        const userEmail = user.email;
        
        userData.getUserByEmail(userEmail)
        .then((user) => this.setState({ user }))
    }

    firstNameChange = (e) => {
        e.preventDefault();
        this.setState({ borrowerFirstName: e.target.value });
    }

    lastNameChange = (e) => {
        e.preventDefault();
        this.setState({ borrowerLastName: e.target.value });
    }

    emailChange = (e) => {
        e.preventDefault();
        this.setState({ borrowerEmail: e.target.value });
    }

    addNewBorrower = () => {
        const { user,
            borrowerFirstName,
            borrowerLastName,
            borrowerEmail } = this.state;
        const newBorrower = {
            userId: user.userId,
            firstName: borrowerFirstName,
            lastName: borrowerLastName,
            email: borrowerEmail,
        }
        console.log("new borrower:", newBorrower);

        borrowerData.addABorrower(newBorrower)
        .then(() => this.props.history.push("/home"))
        .catch((err) => console.log('could not create borrower', err));
    }

    componentDidMount() {
        this.getUser();
    }

    render() {
        const { borrowerFirstName, borrowerLastName, borrowerEmail } = this.state;
        return(
            <div className="AddBorrower">
                <main className="container">
                    <div className="row">
                        <div className=" col-3 secondary-nav">
                            <header>
                                Do Stuff
                            </header>
                            <SecondaryNav />
                        </div>
                        <div className="col-9 d-flex flex-wrap">
                            <header>
                            <h1>Add A Borrower!</h1>
                            </header>
                            <form className="text-left">
                                <div className="form-group">
                                    <label htmlFor="borrower-first-name">Enter your friend's first name</label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    id="borrower-first-name"
                                    value={borrowerFirstName}
                                    onChange={this.firstNameChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="borrower-last-name">Enter your friend's last name</label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    id="borrower-last-name"
                                    value={borrowerLastName}
                                    onChange={this.lastNameChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="borrower-email">Enter your friend's email address</label>
                                    <input
                                    type="email"
                                    className="form-control"
                                    id="borrower-email"
                                    value={borrowerEmail}
                                    onChange={this.emailChange}
                                    />
                                </div>
                                <button className="btn btn-primary" onClick={this.addNewBorrower}>Create Borrower</button>

                            </form>
                        </div>
                    </div>
                </main>
                
            </div>
        )
    }
}

export default AddBorrower;
