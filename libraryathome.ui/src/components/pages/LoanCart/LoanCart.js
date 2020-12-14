import React from 'react';
import firebase from 'firebase';

import borrowerData from '../../../helpers/data/borrowerData';
import libraryItemData from '../../../helpers/data/libraryItemData';
import loanData from '../../../helpers/data/loanData';
import userData from '../../../helpers/data/userData';

import './LoanCart.scss';

class LoanCart extends React.Component {
    state = {
        user: {},
        loan: {},
        books: [],
        borrower: {},
    }

    getCartInfo = () => {
        const { user, loan } = this.state;
        loanData.getCurrentLoan(user.userId)
        .then((loan) => {
            this.setState({ loan })
            borrowerData.getBorrowerByLoan(loan.loanId)
            .then((borrower) => this.setState({ borrower }))
            libraryItemData.getLoanBooks(loan.loanId)
            .then((books) => this.setState({ books }))
        })
        .catch((err) => console.log('could not get loan information', err))
    }

    getUser = () => {
        const user = firebase.auth().currentUser;
        const userEmail = user.email;
        
        userData.getUserByEmail(userEmail)
        .then((user) => this.setState({ user }))
        .then(() => this.getCartInfo())
    }

    componentDidMount() {
        this.getUser();
    }

    render() {
        return(
            <main className="LoanCart">
                <header>
                    <h1>You are loaning...</h1>
                </header>
            </main>
        )
    }
}

export default LoanCart;
