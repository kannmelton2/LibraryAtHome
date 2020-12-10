import React from 'react';
import firebase from 'firebase';

import bookData from '../../../helpers/data/bookData';
import libraryData from '../../../helpers/data/libraryData';
import libraryItemData from '../../../helpers/data/libraryItemData';
import userData from '../../../helpers/data/userData';

import BookCards from '../../shared/BookCards/BookCards';

import './BrowseBooks.scss';

class BrowseBooks extends React.Component {
    state = {
        books: [],
        user: {},
        library: {},
    }

    getUserAndLibrary = () => {
        const user = firebase.auth().currentUser;
        console.log('current user:', user.email);
        const userEmail = user.email;
        
        userData.getUserByEmail(userEmail)
        .then((user) => {
            this.setState({ user })
            libraryData.getLibraryByUserId(user.userId)
            .then((library) => this.setState({ library }))
        })
    }

    getBooks = () => {
        bookData.getAllBooks()
        .then((books) => {
            this.setState({ books })
        })
        .catch((err) => console.log('could not get books', err));
    }

    addABookToLibrary = (newBookId) => {
        const libraryItem = {
            libraryId: this.state.library.libraryId,
            bookId: newBookId,
        }
        
        libraryItemData.addBookToLibrary(libraryItem)
        .then(() => {
            this.getBooks();
            this.getUserAndLibrary();
        })
    }

    componentDidMount() {
        this.getBooks();
        this.getUserAndLibrary();
    }

    render() {
        const { books } = this.state;

        const buildBookCards = books.map((book) => (
            <BookCards book={book} key={book.bookId} addABookToLibrary={this.addABookToLibrary} />
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
