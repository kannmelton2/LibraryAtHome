import React from 'react';
import moment from 'moment';

import loanShape from '../../../helpers/propz/loanShape';

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
    }

    componentDidMount() {
        const loanId = this.props.loan.loanId;

        loanData.getLoanByLoanId(loanId)
        .then((loan) => {
            this.setState({ loan })
            libraryItemData.getLoanBooks(loan.loanId)
            .then((books) => this.setState({ books }))
        })
    }

    render() {
       const { loan } = this.props;
       const { books } = this.state;

       const buildLoanBooks = books.map((book) => (
        <LoanBooks key={book.libraryItemId} book={book} isComplete={loan.isComplete}/>
    ));

        return(
            <div className="ViewLoanBookContainer">
                <p>{moment(loan.dueDate).format('L')}</p>
                {buildLoanBooks}
            </div>
        )
    }
}

export default ViewLoanBookContainer;
