import React from 'react';
import PropTypes from 'prop-types';

import bookShape from '../../../helpers/propz/bookShape';

import './BookCards.scss';

class BookCards extends React.Component {
    static propTypes = {
        book: bookShape.bookShape,
        addABookToLibrary: PropTypes.func.isRequired,
    }

    addBookToLibrary = (e) => {
        e.preventDefault();
        const { book, addABookToLibrary } = this.props
        addABookToLibrary(book.bookId);
    }

    render() {
        const { book } = this.props;

        return(
            <div className="BookCards my-2 col-md-3">
                <div className="card">
                    <img src={book.coverImage} className="card-img-top" alt={`cover of ${book.title}`} />
                    <div className="card-body">
                        { 
                        book.title.length > 25 ?
                        <h5 className="card-title">{book.title.substr(0, 25)}...</h5>
                        :
                        <h5 className="card-title">{book.title}</h5>
                        }
                        <p className="card-text">by {book.author}</p>
                        <button onClick={this.addBookToLibrary} className="btn btn-primary">Add to library</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default BookCards;