import React from 'react';
import firebase from 'firebase';

import loanData from '../../../helpers/data/loanData';
import userData from '../../../helpers/data/userData';

import SecondaryNav from '../../shared/SecondaryNav/SecondaryNav';
import ViewLoanBookContainer from '../../shared/ViewLoanBookContainer/ViewLoanBookContainer';

import './ViewLoans.scss';

class ViewLoans extends React.Component {
    state = {
        user: {},
        loans: [],
    }

    getUser = () => {
        const user = firebase.auth().currentUser;
        const userEmail = user.email;
        
        userData.getUserByEmail(userEmail)
        .then((user) => {
            this.setState({ user })
            this.getLoans();
        })
    }

    getLoans = () => {
        const userId = this.state.user.userId;

        loanData.getLoansByUser(userId)
        .then((loans) => this.setState({ loans }))
        .catch((err) => console.log('could not get loans', err));
    }

    componentDidMount() {
        this.getUser();
    }

    render() {
        const { loans } = this.state;

        const buildLoans = loans.map((loan) => (
            <ViewLoanBookContainer key={loan.loanId} loan={loan} />
        ));

        return(
            <div className="ViewLoans">
                
                <main className="container">
                    <div className="row">
                        <div className=" col-3 secondary-nav">
                            <header>
                                Do Stuff
                            </header>
                            <SecondaryNav />
                        </div>
                        <div className="col-9 d-flex flex-wrap loans text-center">
                            <header>
                                <h1>Current Loans:</h1>
                            </header>
                            {buildLoans}
                        </div>
                    </div>
                </main>
            </div>
            
        )
    }
}

export default ViewLoans;
