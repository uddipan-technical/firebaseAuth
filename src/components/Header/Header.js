import React, { useContext } from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './Header.css';
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../AuthConfig/firebaseConfig';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const {name, email} = loggedInUser;
    const handleLogOut = () => {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            setLoggedInUser({});
          }).catch((error) => {
            // An error happened.
          });
    }
    return (
        <Navbar expand="lg" className="header">
            <Link to="/" className="navbar-brand">BD International Transport</Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
                <Link className="nav-link" to="/">Home</Link>
                <Link className="nav-link" to="/destination">Destination</Link>
                <Link className="nav-link" to="/">Blog</Link>
                <Link className="nav-link" to="/">Contact</Link>
                {
                    email ?  <NavDropdown title={name} id="basic-nav-dropdown">
                     <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>    
                    <NavDropdown.Item onClick={handleLogOut}>Log Out</NavDropdown.Item>
                 </NavDropdown> : <Link className="nav-link" to="/login"><button className="btn btn-danger">Login</button></Link>
                }
               
            </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;