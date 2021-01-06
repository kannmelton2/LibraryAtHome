import React from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';

import borrowerData from '../../../helpers/data/borrowerData';
import libraryData from '../../../helpers/data/libraryData';
import libraryItemData from '../../../helpers/data/libraryItemData';
import loanData from '../../../helpers/data/loanData';
import loanItemData from '../../../helpers/data/loanItemData';
import userData from '../../../helpers/data/userData';

import LoanBooks from '../../shared/LoanBooks/LoanBooks';
import SecondaryNav from '../../shared/SecondaryNav/SecondaryNav';

import './LoanCart.scss';

class LoanCart extends React.Component {
    state = {
        user: {},
        library: {},
        loan: {},
        books: [],
        borrower: {},
    }

    getCartInfo = () => {
        const { user } = this.state;
        loanData.getCurrentLoan(user.userId)
        .then((loan) => {
            this.setState({ loan })
            borrowerData.getBorrowerByLoan(loan.loanId)
            .then((borrower) => this.setState({ borrower }))
            libraryItemData.getLoanBooks(loan.loanId)
            .then((books) => this.setState({ books }))
        })
        .catch((err) => console.log('could not get loan information', err));
    }

    getUserAndLibrary = () => {
        const user = firebase.auth().currentUser;
        const userEmail = user.email;
        
        userData.getUserByEmail(userEmail)
        .then((user) => {
            this.setState({ user })
            libraryData.getLibraryByUserId(user.userId)
            .then((library) => {
                this.setState({ library })
            })
            .then(() => this.getCartInfo())
        })
    }

    deleteLoanBook = (libraryItemId) => {
    const loanId = this.state.loan.loanId;
    loanItemData.deleteFromCart(loanId, libraryItemId)
    .then(() => this.getCartInfo())
    .catch((err) => console.log('could not delete', err));
    }

    finishLoan = (e) => {
        e.preventDefault();
        const loanId = this.state.loan.loanId;
        loanData.updateLoan(loanId)
        .then(() => this.props.history.push(`/loan-confirmation/${loanId}`))
        .catch((err) => console.log('could not update loan', err));
    }

    cancelLoan = (e) => {
        e.preventDefault();
        const loanId = this.state.loan.loanId;
        loanData.deleteLoan(loanId).then(() => this.props.history.push('/home'))
        .catch((err) => console.log(' could not delete loan', err))
    }

    componentDidMount() {
        this.getUserAndLibrary();
    }

    render() {
        const { books, borrower, loan, library } = this.state;

        const buildLoanBooks = books.map((book) => (
            <LoanBooks key={book.libraryItemId} book={book} deleteLoanBook={this.deleteLoanBook} isComplete={loan.isComplete}/>
        ));

        return(
            <main className="LoanCart">
                { loan ?
                <React.Fragment>
                <header className="page-header">
                    <h1>{library.libraryName}</h1>
                    <h2>Complete or cancel your in-progress loan</h2>
                </header>
                <section className="container">
                    <div className="row">
                        <div className="col-3 secondary-nav">
                            <SecondaryNav />
                        </div>
                        <div className="col-9 d-flex flex-wrap">
                            <div className="loan-books">
                                <header className="books-header">
                                    <p>You are loaning:</p>
                                </header>
                                <p>You are loaning the following books to {borrower.firstName} {borrower.lastName}</p>
                            {buildLoanBooks}
                            </div>
                            
                                <button className="btn btn-danger m-5" onClick={this.cancelLoan}>Cancel Loan</button>
                                <button className="btn btn-primary m-5" onClick={this.finishLoan}>Complete Loan</button>
                        </div>
                    </div>
                </section>
                </React.Fragment>
                :
                <React.Fragment>
                    <p>You are not currently preparing a loan, would you like to start a new one?</p>
                    <Link className="btn btn-primary" to='/add-loan'>Create A Loan</Link>
                </React.Fragment>
                
                }
                
            </main>
        )
    }
}

export default LoanCart;
