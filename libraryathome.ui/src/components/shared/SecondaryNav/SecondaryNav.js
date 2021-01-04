import React from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import { Nav, NavItem, NavLink } from 'reactstrap';

import './SecondaryNav.scss';

class SecondaryNav extends React.Component {
    render() {
        return(
            <Nav className="SecondaryNav">
                <header>
                    <h2>Do Stuff</h2>
                </header>
                <NavItem>
                    <NavLink className="sec-nav-link" tag={RRNavLink} to="/add-borrower">Add A Borrower</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className="sec-nav-link" tag={RRNavLink} to="/add-loan">Create A Loan</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className="sec-nav-link" tag={RRNavLink} to="/due-soon">Due Soon</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className="sec-nav-link" tag={RRNavLink} to="/view-loans">See All Loans</NavLink>
                </NavItem>
            </Nav>
        )
    }
}

export default SecondaryNav;
