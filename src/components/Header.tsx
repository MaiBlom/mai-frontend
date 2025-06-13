import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router';
import axios from 'axios';

function Header(props: { darkLightMode: boolean, toggleDarkLightMode: () => void,
                            loggedIn: boolean, setLoggedIn: () => void }) {
    return (
        <Navbar bg={`${props.darkLightMode ? 'dark' : 'grey'}`} data-bs-theme={`${props.darkLightMode ? 'dark' : 'light'}`}>
            <Container>
                <Navbar.Brand>Mai page</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <Nav.Link as={Link} to="">Home</Nav.Link>
                        <NavDropdown title="Games" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to={`${window.location.pathname}tictactoe`}>Tic Tac Toe</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={`${window.location.pathname}snake`}>Snake</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={`${window.location.pathname}tetris`}>Tetris</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as={Link} to={`${window.location.pathname}aboutme`}>About me</Nav.Link>
                    </Nav>
                </Navbar.Collapse>

                <Nav>
                    <Nav.Link onClick={props.toggleDarkLightMode}>
                        { props.darkLightMode ? 'Dark' : 'Light' }mode
                    </Nav.Link>
                    {/* <Nav.Link onClick={() => fetchData()}>
                        { props.loggedIn ? 'Logout' : 'Login'}
                    </Nav.Link> */}
                </Nav>
            </Container>
        </Navbar>
    );
}

/* const fetchData = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/user/1');
        console.log(response);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
} */

export default Header;