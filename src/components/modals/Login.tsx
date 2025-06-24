import axios from 'axios';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function LoginModal(props: {
    theme: boolean,
    show: boolean,
    setLoginModal: () => void
    setLoggedIn: (bool: boolean) => void
}) {
    return (
        <>
            <Modal
                show={props.show}
                onHide={props.setLoginModal}
                data-bs-theme={props.theme ? 'dark' : 'light'}
            >
                <Form>
                    <Modal.Header closeButton>
                        <Modal.Title>Register</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId='RegisterForm.Username'>
                            <Form.Label>Username</Form.Label>
                            <Form.Control />
                        </Form.Group>
                        <Form.Group
                            controlId='RegisterForm.Password'
                            style={{ paddingTop: '10px' }}
                        >
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type='submit' variant='primary'>
                            Register
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

export default LoginModal;