import React from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,

  } from 'reactstrap';

import firebase from 'firebase/app';
import 'firebase/auth';

import './MyNavbar.scss';

class MyNavbar extends React.Component {
    state = {
        isOpen: false,
    }

    logMeOut = (e) => {
        e.preventDefault();
        firebase.auth().signOut();
        <NavLink className="navbar-links" tag={RRNavLink} to='/login'>LogIn</NavLink>
      }


    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        const { isOpen } = this.state;
        const { authed } = this.props;

        const buildNavbar = () => {
            const { authed } = this.props;
            if (authed) {
              return (
                    <NavItem>
                        <NavLink tag={RRNavLink} to="/browse-books">Browse Books</NavLink>
                    </NavItem>
              );
            }
            return <Nav className="mr-auto" navbar></Nav>;
          };

        return(
            <div className="MyNavbar">
                <Navbar color="dark" dark expand="md">
                    <NavbarBrand tag={RRNavLink} to="/home">LibraryAtHome</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    {buildNavbar()}
                    {
                    authed ?
                        <NavItem>
                            <button className="btn btn-warning" onClick={this.logMeOut}>Log Out</button>
                        </NavItem>
                    :
                        <NavItem>
                            <NavLink className="btn btn-info" tag={RRNavLink} to='/auth'>LogIn</NavLink>
                        </NavItem>
                   }
                </Nav>
                </Collapse>
                </Navbar>
            </div>
        )
    }
}

export default MyNavbar;