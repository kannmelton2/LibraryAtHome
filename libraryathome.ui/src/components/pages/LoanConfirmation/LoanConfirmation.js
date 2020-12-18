import React from 'react';

import loanData from '../../../helpers/data/loanData';
import libraryItemData from '../../../helpers/data/libraryItemData';

import LoanBooks from '../../shared/LoanBooks/LoanBooks';

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
        const { books } = this.state;

        const buildLoanBooks = books.map((book) => (
            <LoanBooks key={book.libraryItemId} book={book} />
        ));

        return(
            <div className="LoanConfirmation">
                <h1>Loan Confirmation Page</h1>
                {buildLoanBooks}
            </div>
        )
    }
}

export default LoanConfirmation;
