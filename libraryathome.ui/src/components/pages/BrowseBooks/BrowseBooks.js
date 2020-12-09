import React from 'react';

import bookData from '../../../helpers/data/bookData';

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
        return(
            <div className="BrowseBooks">

            </div>
        )
    }
}

export default BrowseBooks;
