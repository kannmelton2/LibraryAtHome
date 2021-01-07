import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';

import borrowerData from '../../../helpers/data/borrowerData';
import libraryData from '../../../helpers/data/libraryData';
import libraryItemData from '../../../helpers/data/libraryItemData';
import loanData from '../../../helpers/data/loanData';
import loanItemData from '../../../helpers/data/loanItemData';
import userData from '../../../helpers/data/userData';

import SecondaryNav from '../../shared/SecondaryNav/SecondaryNav';

import './AddLoan.scss';

class AddLoan extends React.Component {
    state = {
        user: {},
        library: {},
        libraryBorrowers: [],
        // loanBorrower (object) state is for the borrower currently associated with an incomplete loan
        loanBorrower: {},
        loan: {},
        libraryBooks: [],
        // loanBorrowerId (string) state is used for the onChange handler to set a new borrower to a new loan
        loanBorrowerId: '',
        loanBookId: '',
    }

   // get the user object and library
   // calls functions to get the existing loan, if there is one, and the borrower, if there is one
   // calls functions to get the borrowers and the library books associated with a user/library
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
            .then(() => this.getLoanData())
            .then(() => {
                this.getLibraryBooks();
                this.getLibraryBorrowers();
            })
        })
    }

    getLoanData = () => {
        const { user } = this.state;

        loanData.getCurrentLoan(user.userId)
        .then((loan) => {
            this.setState({ loan })
            borrowerData.getBorrowerByLoan(loan.loanId)
            .then((loanBorrower) => this.setState({ loanBorrower }))
        })
    }

    getLibraryBorrowers = () => {
        const { user } = this.state;

        borrowerData.getBorrowersByUserId(user.userId)
        .then((libraryBorrowers) => this.setState({ libraryBorrowers }))
        .catch((err) => console.log('could not get borrowers', err))
    }

    getLibraryBooks = () => {
        const { library } = this.state;

        libraryItemData.getOnShelfLibraryBooks(library.libraryId)
        .then((libraryBooks) => this.setState({ libraryBooks }))
        .catch((err) => console.log('could not get library books', err))
    }

    componentDidMount() {
        this.getUserAndLibrary();
    }

    // the following functions will be our onChange handlers for the form
    loanBorrowerChange = (e) => {
        e.preventDefault();
        this.setState({ loanBorrowerId: e.target.value });
      }

      loanBookChange = (e) => {
        e.preventDefault();
        this.setState({ loanBookId: e.target.value });
      }

      createLoan = (e) => {
          e.preventDefault();
        const {
            user,
            loanBorrowerId,
            loanBookId,
            } = this.state;
        const newLoan = {
            userId: user.userId,
            borrowerId: loanBorrowerId *1,
            libraryItemId: loanBookId *1,
        }

        loanData.addNewLoan(newLoan)
        .then(() => {
            this.getUserAndLibrary();
            this.setState({ loanBookId: '' });
        })
        .catch((err) => console.log('could not create loan', err))
      }

      addToLoan = (e) => {
          e.preventDefault();
          const { loan, loanBookId } = this.state;
          const newLoanItem = {
              loanId: loan.loanId,
              libraryItemId: loanBookId *1,
          }

          loanItemData.addLoanItem(newLoanItem)
          .then(() => {
            this.getUserAndLibrary();
            this.setState({ loanBookId: '' });
          })
          .catch((err) => console.log('could not create loan item', err))
      }

    render() {
        const {
            loanBorrower,
            libraryBorrowers,
            loanBorrowerId,
            loan,
            libraryBooks,
            loanBookId,
            library
         } = this.state;

        const borrowerOptions = libraryBorrowers.map((borrower) => (
            <option key={borrower.borrowerId} value={borrower.borrowerId}>{borrower.firstName} {borrower.lastName}</option>
          ));

          const bookOptions = libraryBooks.map((book) => (
            <option key={book.libraryItemId} value={book.libraryItemId}>{book.title}</option>
          ));
        return(
            <div className="AddLoan">
                 <header className="page-header">
                    <h1>{library.libraryName}</h1>
                    <h2>Add a borrower, then as many books as you want, then review and complete your loan in the cart.</h2>
                </header>
                <main className="container">
                    <div className="row">
                        <section className="col-3 secondary-nav">
                        <SecondaryNav />
                        </section>
                        <div className="col-9 d-flex flex-wrap">
                            <header className="form-header">
                                <p>Choose a borrower, then add as many books as you like.</p>
                            </header>
                            <form className="text-left">
                                {/* ternary - if there is a loan, it shows who you are loaning to, if there is no loan, 
                                it gives you the dropdown to pick someone */}
                                { loan ? 
                                <p>You are loaning to: {loanBorrower.firstName} {loanBorrower.lastName}</p> :
                                <div className="form-group">
                                    <label htmlFor="loan-borrower">Who would you like to loan a book to?</label>
                                    <br />
                                    <select id="loan-borrower" value={loanBorrowerId} onChange={this.loanBorrowerChange}>
                                        <option>Select Borrower</option>
                                        {borrowerOptions}
                                    </select>
                                </div>
                                }

                                <div className="form-group">
                                    <label htmlFor="loan-books">What book would you like to loan?</label>
                                    <br />
                                    <select id="loan-books" value={loanBookId} onChange={this.loanBookChange}>
                                        <option>Select Book</option>
                                        {bookOptions}
                                    </select>
                                </div>

                                    {
                                    loan ?
                                    <button className="btn dark-green-btn" onClick={this.addToLoan}>Add Book</button> 
                                    :
                                    <button className="btn dark-green-btn" onClick={this.createLoan}>Add Book</button>
                                    }
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}

export default AddLoan;
