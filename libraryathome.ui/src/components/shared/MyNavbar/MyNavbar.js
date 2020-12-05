import React from 'react';
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
                        <NavLink href="/components/">Components</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                    </NavItem>
                </Nav>
              );
            }
            return <Nav className="mr-auto" navbar></Nav>;
          };

        return(
            <div className="MyNavbar">
                <Navbar color="dark" dark expand="md">
                    <NavbarBrand href="/">LibraryAtHome</NavbarBrand>
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