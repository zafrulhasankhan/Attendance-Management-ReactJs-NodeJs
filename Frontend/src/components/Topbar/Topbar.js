import React from 'react';

import { Nav, NavDropdown, Container, Navbar,  } from "react-bootstrap"
import { MenuItem } from '@material-ui/core';
import { useAuth } from "../../contexts/AuthContext"

function Topbar() {
    const { currentUser } = useAuth();
    console.log(currentUser);
    return (
        <div>

            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">


                <Navbar.Brand href="#home">&ensp;&ensp;&ensp;Attendance Management</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">


                        <Nav.Link href="#features">{currentUser?.email}</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>

                    </Nav>
                    {/* <Nav className="justify-content-end" alignRight pullRight className="no" >
                        <NavDropdown
                            title={
                                <img style={{ borderRadius: '150px', height: '40px', width: '40px' }}
                                    src={currentUser.photoURL} />
                            } >

                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>

                        </NavDropdown>

                    </Nav> */}
                                   </Navbar.Collapse>

            </Navbar>


        </div>
    );
}

export default Topbar;

