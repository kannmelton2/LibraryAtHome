import React from 'react';
import moment from 'moment';

import loanShape from '../../../helpers/propz/loanShape';

import borrowerData from '../../../helpers/data/borrowerData';
import loanData from '../../../helpers/data/loanData';
import libraryItemData from '../../../helpers/data/libraryItemData';

import LoanBooks from '../LoanBooks/LoanBooks';

import './ViewLoanBookContainer.scss';

class ViewLoanBookContainer extends React.Component {
    static propTypes = {
        loan: loanShape.loanShape,
    }

    state = {
        books: [],
        borrower: {},
    }

    componentDidMount() {
        const loanId = this.props.loan.loanId;

        borrowerData.getBorrowerByLoan(loanId)
        .then((borrower) => this.setState({ borrower }));

        libraryItemData.getLoanBooks(loanId)
        .then((books) => this.setState({ books }));
    }

    render() {
       const { loan } = this.props;
       const { books, borrower } = this.state;

       const buildLoanBooks = books.map((book) => (
        <LoanBooks key={book.libraryItemId} book={book} isComplete={loan.isComplete}/>
    ));

        return(
            <div className="ViewLoanBookContainer">
                <p>Loan Due: <span className="due-date">{moment(loan.dueDate).format('L')}</span></p>
                <p>The following books are being loaned to: {borrower.firstName} {borrower.lastName}</p>
                {buildLoanBooks}
            </div>
        )
    }
}

export default ViewLoanBookContainer;
