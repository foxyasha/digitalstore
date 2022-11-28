import React, { Component } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import './styles/Animation.css'
import {Route, BrowserRouter as Router, Routes, Link} from "react-router-dom";
import Home from './pages/Home'
import Login from './pages/Login.js'

export default class Header extends Component {
    render() {
        return (
            <>
            <Navbar fixed="top" collapseOnSelect expand="md" bg="dark" variant="dark" >
                <Container>
                    <Navbar.Brand href="/" >
                        <div className="typewriter">
                            <h1>BEBRA</h1>
                        </div>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav" >
                        <Nav className="me-auto">
                            <Nav.Link href="/"> Home </Nav.Link>
                            <Nav.Link href="Login"> Login </Nav.Link>
                            <Nav.Link href="Registration"> Registration </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

                <Router>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="Login" element={<Login/>}/>
                    </Routes>
                </Router>
            </>

        );
    }
}