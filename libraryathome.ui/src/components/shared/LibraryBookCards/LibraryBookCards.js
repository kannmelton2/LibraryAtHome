import React from 'react';

import libraryBookShape from '../../../helpers/propz/libraryBookShape';

import './LibraryBookCards.scss';

class LibraryBookCards extends React.Component {
    static propTypes = {
        libraryBook: libraryBookShape.libraryBookShape,
    }

    render() {
        const { libraryBook } = this.props;
        return(
            <section className="LibraryBookCards my-2 col-md-4">
                <div className="card">
                    <img src={libraryBook.coverImage} className="card-img-top" alt={`cover of ${libraryBook.title}`} />
                    <div className="card-body">
                        <h5 className="card-title">{libraryBook.title}</h5>
                        <p className="card-text">by {libraryBook.author}</p>
                        {
                            libraryBook.onShelf ?
                            ''
                            :
                            <button className="btn btn-primary">Return to library</button>
                        }
                    </div>
                </div>
            </section>
        )
    }
}

export default LibraryBookCards;
