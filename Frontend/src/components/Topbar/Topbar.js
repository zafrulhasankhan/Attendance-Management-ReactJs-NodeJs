import React, { useState } from 'react';
import { Nav, NavDropdown, Container, Navbar, Dropdown, DropdownButton, NavLink } from "react-bootstrap"
import { MenuItem } from '@material-ui/core';
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

function Topbar() {
    const { currentUser, logout } = useAuth();
    const [error, setError] = useState("")
    const history = useHistory()
    async function handleLogout() {
        setError("")

        try {
            await logout()
            history.push("/login")
        } catch {
            setError("Failed to log out")
        }
    }
    return (
        <div>

            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="#home">&ensp;&ensp;Attendance Management</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="#pricing" onClick={handleLogout}>Logout</Nav.Link>
                    </Nav>
                    {currentUser?(
                    <Nav style={{ marginRight: '15px' }}>

                        <Nav.Link href="#pricing"> <img style={{ borderRadius: '150px', height: '40px', width: '40px' }}
                            src={currentUser?.photoURL} /></Nav.Link>

                        <Nav.Link href="#pricing" style={{ padding: '2px' }}>
                            <span style={{ fontSize: "13px", padding: '0px' }}>{currentUser?.displayName}</span>
                            <br /><span style={{ fontSize: "12px", padding: '0px' }}>{currentUser?.email}</span>
                        </Nav.Link>

                    </Nav>
                    ):("")}

                </Navbar.Collapse>

            </Navbar>


        </div>
    );
}

export default Topbar;

