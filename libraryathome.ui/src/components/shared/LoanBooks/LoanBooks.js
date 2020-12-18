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
            <main className="LoanBooks">
                <div className="card">
                    <div className="card-body">
                    <p className="card-title">{book.title}</p>
                    <p className="card-text">by: {book.author}</p>
                    { isComplete ?
                    '' :
                    <button className="btn btn-dark" onClick={() => deleteLoanBook(book.libraryItemId)}>X</button>
                    }
                    </div>
                    
                </div>
            </main>
        )
    }
}

export default LoanBooks;