import React from 'react';

import libraryBookShape from '../../../helpers/propz/libraryBookShape';

import './LoanBooks.scss';

class LoanBooks extends React.Component {
    static props = {
        book: libraryBookShape.libraryBookShape,
    }
    render() {
        const { book } = this.props;

        return(
            <main className="LoanBooks">
                <div className="card">
                    <div className="card-body">
                    <p className="card-title">{book.title}</p>
                    <p className="card-text">by: {book.author}</p>
                    </div>
                    
                </div>
            </main>
        )
    }
}

export default LoanBooks;