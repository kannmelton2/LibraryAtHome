import React from 'react';
import firebase from 'firebase';

import userData from '../../../helpers/data/userData';
import libraryData from '../../../helpers/data/libraryData';
import libraryItemData from '../../../helpers/data/libraryItemData';

import LibraryBookCards from '../../shared/LibraryBookCards/LibraryBookCards';
import SecondaryNav from '../../shared/SecondaryNav/SecondaryNav';

import './Home.scss';

class Home extends React.Component {
    state = {
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
            .then(() => this.getMyLibraryBooks())
        })
    }

    getMyLibraryBooks = () => {
        libraryItemData.getLibraryBooks(this.state.library.libraryId)
        .then((libraryBooks) => this.setState({ libraryBooks }))
        .catch((err) => console.log('could not get library books', err));
    }

    returnLibraryBook = (libraryItemId) => {
        libraryItemData.putBookOnShelf(libraryItemId)
        .then(() => this.getUserAndLibrary())
        .catch((err) => console.log('could not put book on shelf'));
    }

    componentDidMount() {
        this.getUserAndLibrary();
    }

    render() {
        const { library, libraryBooks } = this.state;

        const buildLibraryBooks = libraryBooks.map((libraryBook) => (
            <LibraryBookCards key={libraryBook.libraryItemId} libraryBook={libraryBook} returnLibraryBook={this.returnLibraryBook}/>
          ));

        return(
            <div className="Home text-center">
                <header>
                <h1>{library.libraryName}</h1>
                </header>
                <main className="container">
                    <div className="row">
                        <div className=" col-3 secondary-nav">
                            <SecondaryNav />
                        </div>
                        <div className="col-9 d-flex flex-wrap library-books text-center">
                            {buildLibraryBooks}
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}

export default Home;