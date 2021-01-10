import React from 'react';
import firebase from 'firebase';
import Swal from 'sweetalert2';

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
        libraryBooks: [],
    }

    getUserAndLibrary = () => {
        const user = firebase.auth().currentUser;
        const userEmail = user.email;
        
        userData.getUserByEmail(userEmail)
        .then((user) => {
            this.setState({ user })
            libraryData.getLibraryByUserId(user.userId)
            .then((library) => {
                this.setState({ library })
            })
            .then(() => this.getLibraryBooks())
        })
    }

    getLibraryBooks = () => {
        libraryItemData.getLibraryBooks(this.state.library.libraryId)
        .then((libraryBooks) => this.setState({ libraryBooks }))
        .catch((err) => console.log('could not get library books', err));
    }

    getBooks = () => {
        bookData.getAllBooks()
        .then((books) => {
            this.setState({ books })
        })
        .catch((err) => console.log('could not get books', err));
    }

    isALibraryBook = (booksId) => {
        const librarysBooks = this.state.libraryBooks;
        const librarysBook = librarysBooks.find(x => x.bookId === booksId);
        return librarysBook;
    }

    addABookToLibrary = (newBookId) => {
        const libraryItem = {
            libraryId: this.state.library.libraryId,
            bookId: newBookId,
        }

        const libraryBook = this.isALibraryBook(newBookId);

        if (libraryBook) {
            Swal.fire({
                background: ' #b7b7a4',
                iconColor: '#efefef',
                title: 'Error!',
                text: 'This book is already in your library',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
            console.log('in library, should not be added');
        } else {
            libraryItemData.addBookToLibrary(libraryItem)
            .then(() => {
                this.getBooks();
                this.getUserAndLibrary();
            })
        }
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
