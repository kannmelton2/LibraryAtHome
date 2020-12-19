import React from 'react';

import loanData from '../../../helpers/data/loanData';
import libraryItemData from '../../../helpers/data/libraryItemData';

import LoanBooks from '../../shared/LoanBooks/LoanBooks';
import SecondaryNav from '../../shared/SecondaryNav/SecondaryNav';

import './LoanConfirmation.scss';

class LoanConfirmation extends React.Component {
    state = {
        loan: {},
        books: [],
    }

    componentDidMount() {
        const loanId = this.props.match.params.loanId;

        loanData.getLoanByLoanId(loanId)
        .then((loan) => {
            this.setState({ loan })
            libraryItemData.getLoanBooks(loan.loanId)
            .then((books) => this.setState({ books }))
        })
    }
    render() {
        const { books, loan } = this.state;

        const buildLoanBooks = books.map((book) => (
            <LoanBooks key={book.libraryItemId} book={book} isComplete={loan.isComplete} />
        ));

        return(
            <div className="LoanConfirmation">
                <h1>Loan Confirmation Page</h1>
                <main className="container">
                    <div className="row">
                        <div className=" col-3 secondary-nav">
                            <header>
                                Do Stuff
                            </header>
                            <SecondaryNav />
                        </div>
                        <div className="col-9 d-flex flex-wrap loan-books text-center">
                            {buildLoanBooks}
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}

export default LoanConfirmation;
