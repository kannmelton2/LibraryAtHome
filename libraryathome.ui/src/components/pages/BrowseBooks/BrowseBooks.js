import React from 'react';

import bookData from '../../../helpers/data/bookData';

import BookCards from '../../shared/BookCards/BookCards';

import './BrowseBooks.scss';

class BrowseBooks extends React.Component {
    state = {
        books: [],
    }

    getBooks = () => {
        bookData.getAllBooks()
        .then((books) => {
            this.setState({ books })
        })
        .catch((err) => console.log('could not get books', err));
    }

    componentDidMount() {
        this.getBooks();
    }
    render() {
        const { books } = this.state;

        const buildBookCards = books.map((book) => (
            <BookCards book={book} key={book.bookId} />
        ))
        return(
            <div className="BrowseBooks">
                <header>
                <h1>Browse Books</h1>
                <p>Add books to your library</p>
                </header>
                <main className="d-flex flex-wrap book-cards-container">
                {buildBookCards}
                </main>
            </div>
        )
    }
}

export default BrowseBooks;
