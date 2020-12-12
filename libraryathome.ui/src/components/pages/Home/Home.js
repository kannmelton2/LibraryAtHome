import React from 'react';
import firebase from 'firebase';

import userData from '../../../helpers/data/userData';
import libraryData from '../../../helpers/data/libraryData';

import SecondaryNav from '../../shared/SecondaryNav/SecondaryNav';

import './Home.scss';

class Home extends React.Component {
    state = {
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

    componentDidMount() {
        this.getUserAndLibrary();
    }

    render() {
        const { library } = this.state;

        return(
            <div className="Home text-center">
                <header>
                <h1>{library.libraryName}</h1>
                </header>
                <main className="container">
                    <div className="row">
                        <div className=" col-3 secondary-nav">
                            <header>
                                Do Stuff
                            </header>
                            <SecondaryNav />
                        </div>
                        <div className="col-9 secondary-nav text-center">
                            <p>The Library Books will be displayed here</p>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}

export default Home;