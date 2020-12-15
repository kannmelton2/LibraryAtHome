import React from 'react';
import firebase from 'firebase';

import borrowerData from '../../../helpers/data/borrowerData';
import libraryItemData from '../../../helpers/data/libraryItemData';
import loanData from '../../../helpers/data/loanData';
import userData from '../../../helpers/data/userData';

import LoanBooks from '../../shared/LoanBooks/LoanBooks';
import SecondaryNav from '../../shared/SecondaryNav/SecondaryNav';

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
        const { books, borrower } = this.state;

        const buildLoanBooks = books.map((book) => (
            <LoanBooks key={book.libraryItemId} book={book} />
        ));

        return(
            <main className="LoanCart">
                <header>
                    <h1>You are loaning...</h1>
                </header>
                <section className="container">
                    <div className="row">
                        <div className="col-3 secondary-nav">
                            <header>
                                Do Stuff
                            </header>
                            <SecondaryNav />
                        </div>
                        <div className="col-9 d-flex flex-wrap">
                            <div className="loan-books">
                                <header>
                                    <p>You are loaning the following books:</p>
                                </header>
                            {buildLoanBooks}
                            </div>
                            <div className="loan-borrower">
                                <header>
                                    <p>You are loaning the above books to:</p>
                                </header>
                                <p className="card">{borrower.firstName} {borrower.lastName}</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        )
    }
}

export default LoanCart;
