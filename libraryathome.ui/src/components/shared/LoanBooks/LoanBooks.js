import React from 'react';
import PropTypes from 'prop-types';

import libraryBookShape from '../../../helpers/propz/libraryBookShape';

import './LoanBooks.scss';

class LoanBooks extends React.Component {
    static propTypes = {
        isComplete: PropTypes.bool.isRequired,
        deleteLoanBook: PropTypes.func,
        book: libraryBookShape.libraryBookShape,
    }

    render() {
        const { book, isComplete, deleteLoanBook } = this.props;

        return(
            <main className="LoanBooks d-flex">
                    <div className="loan-books-card">
                    <p className="loan-books-card-title">{book.title}</p>
                    <p className="loan-books-card-text">by: {book.author}</p>
                    </div>
                    { isComplete ?
                    '' :
                    <button className="btn btn-dark btn-sm ml-auto" onClick={() => deleteLoanBook(book.libraryItemId)}>X</button>
                    }
            </main>
        )
    }
}

export default LoanBooks;