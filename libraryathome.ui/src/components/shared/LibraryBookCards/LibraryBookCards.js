import React from 'react';
import PropTypes from 'prop-types';

import libraryBookShape from '../../../helpers/propz/libraryBookShape';

import './LibraryBookCards.scss';

class LibraryBookCards extends React.Component {
    static propTypes = {
        libraryBook: libraryBookShape.libraryBookShape,
        returnLibraryBook: PropTypes.func.isRequired,
    }

    render() {
        const { libraryBook, returnLibraryBook } = this.props;
        return(
            <section className="LibraryBookCards my-2 col-md-4">
                <div className="card d-flex flex-wrap">
                    <img src={libraryBook.coverImage} className="card-img-top" alt={`cover of ${libraryBook.title}`} />
                    <div className="card-body">
                        { 
                        libraryBook.title.length > 25 ?
                        <h5 className="card-title">{libraryBook.title.substr(0, 25)}...</h5>
                        :
                        <h5 className="card-title">{libraryBook.title}</h5>
                        }

                        <p className="card-text">by {libraryBook.author}</p>
                        
                        {
                            libraryBook.onShelf ?
                            ''
                            :
                            <button className="btn dark-green-btn" onClick={() => returnLibraryBook(libraryBook.libraryItemId)}>Return to library</button>
                        }
                    </div>
                </div>
            </section>
        )
    }
}

export default LibraryBookCards;
