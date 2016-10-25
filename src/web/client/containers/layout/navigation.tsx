import * as React from 'react';
import { Nav, NavItem, Navbar } from 'react-bootstrap';

export default class Navagation extends React.Component<any, any> {
    public render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">Pat Bot</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} href="#">Home</NavItem>
                        <NavItem eventKey={2} href="#">Commands</NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
