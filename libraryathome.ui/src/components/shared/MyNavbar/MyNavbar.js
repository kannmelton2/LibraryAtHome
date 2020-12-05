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

import './MyNavbar.scss';

class MyNavbar extends React.Component {
    state = {
        isOpen: false,
    }


    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        const { isOpen } = this.state;

        const buildNavbar = () => {
            const { authed } = this.props;
            if (authed) {
              return (
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <NavLink tag={RRNavLink} to="">Browse Books</NavLink>
                    </NavItem>
                </Nav>
              );
            }
            return <Nav className="mr-auto" navbar></Nav>;
          };

        return(
            <div className="MyNavbar">
                <Navbar color="dark" dark expand="md">
                    <NavbarBrand to="/home">LibraryAtHome</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={isOpen} navbar>
                    {buildNavbar()}
                </Collapse>
                </Navbar>
            </div>
        )
    }
}

export default MyNavbar;