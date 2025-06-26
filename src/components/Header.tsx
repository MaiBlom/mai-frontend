import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router';
import { useState } from 'react';
import { ReactComponent as Moon } from '../assets/svg/moon.svg'
import { ReactComponent as Sun } from '../assets/svg/sun.svg'

function Header(props: {
    theme: boolean,
    toggleTheme: () => void,
    loggedIn: boolean,
    setRegisterModal: () => void
    setLoginModal: () => void
}) {
    const [loginPositionCss, setLoginPositionCss] = useState(true);

    return (
        <Navbar
            bg={`${props.theme ? 'dark' : 'light'}`}
            data-bs-theme={`${props.theme ? 'dark' : 'light'}`}
            fixed="top"
            expand="md">
            <Container>
                <Nav style={{ flexDirection: 'row' }}>
                    <Nav.Link style={{ paddingRight: '10px' }}
                        onClick={props.toggleTheme}>
                        {props.theme ? <Moon /> : <Sun />}
                    </Nav.Link>
                    <Navbar.Brand>Mai Blom</Navbar.Brand>
                </Nav>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse
                    id="responsive-navbar-nav"
                    role="region"
                    onEnter={() => setLoginPositionCss(false)}
                    onExited={() => setLoginPositionCss(true)}>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to={`/`}>Home</Nav.Link>
                        <NavDropdown title="Games" id="collapsible-nav-dropdown">
                            <NavDropdown.Item as={Link} to={`/tictactoe`}>Tic Tac Toe</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={`/snake`}>Snake</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={`/tetris`}>Tetris</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as={Link} to={`/aboutme`}>About me</Nav.Link>
                    </Nav>
                    <Nav style={loginPositionCss ? { float: 'right' } : {}}>
                        <Nav.Link onClick={props.setRegisterModal}>
                            Register
                        </Nav.Link>
                        <Nav.Link onClick={props.setLoginModal}>
                            {props.loggedIn ? 'Logout' : 'Login'}
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;