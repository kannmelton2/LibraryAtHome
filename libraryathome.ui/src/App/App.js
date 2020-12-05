import React from 'react';

import './App.scss';

import Auth from '../components/pages/Auth/Auth';
import Home from '../components/pages/Home/Home';
import MyNavbar from '../components/shared/MyNavbar/MyNavbar';

class App extends React.Component {
  state = {
    authed: true,
  }
  render() {
    const { authed } = this.state;
    return (
      <div className="App">
        <MyNavbar authed={authed} />
        <header className="App-header">
          <h1>LibraryAtHome</h1>
        </header>
        <Auth />
        <Home />
      </div>
    );
  }

}

export default App;
