import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { InputGroup, Row } from 'react-bootstrap';
import * as formik from 'formik';

function LoginModal(props: {
    theme: boolean,
    show: boolean,
    setLoginModal: () => void
    setLoggedIn: (bool: boolean) => void
}) {
    const { Formik } = formik;
    const [backendErrors, setBackendErrors] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Handle submit | Send register user request if valid | Update validation if errors
    const login = async () => {
        setSubmitted(true);
        try {
            const data = {
                user: {
                    username: username,
                    password: password
                }
            };
            const resp = await axios.post(
                'http://localhost:4000/api/user/login',
                data,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            if (resp.status === 202) {
                setBackendErrors('');
                setSubmitted(false);
                props.setLoginModal();
            }
        } catch (e: any) {
            if (e.response) setBackendErrors(e.response.data);
        }
    }
    return (
        <>
            <Modal
                show={props.show}
                onHide={() => { props.setLoginModal(); }}
                data-bs-theme={props.theme ? 'dark' : 'light'}
            >
                <Form onSubmit={(e) => { e.preventDefault(); login(); }} noValidate>
                    {/* Header */}
                    <Modal.Header closeButton>
                        <Modal.Title>ᓚᘏᗢ</Modal.Title>
                    </Modal.Header>

                    {/* Body */}
                    <Modal.Body>

                        {backendErrors ?
                            <div style={{ paddingBottom: '10px' }}>
                                <label style={{
                                    color: 'rgba(234, 134, 143, 1)',
                                    border: '1px solid rgba(234, 134, 143, 1)',
                                    borderRadius: '5px',
                                    width: '100%',
                                    boxSizing: 'border-box',
                                    padding: '6px 16px',
                                    background: 'rgba(234, 134, 143, 0.08)',
                                    textAlign: 'left',
                                    fontSize: '1rem'
                                }}>
                                    {backendErrors}
                                </label>
                            </div>
                            : ''
                        }

                        {/* Username */}
                        <Form.Group>
                            <InputGroup>

                                <Form.Control
                                    type='text'
                                    placeholder='Username'
                                    name='username'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />

                            </InputGroup>
                        </Form.Group>

                        {/* Password */}
                        <Form.Group
                            style={{ paddingTop: '10px' }}
                        >
                            <InputGroup>

                                <Form.Control
                                    type='password'
                                    placeholder='Password'
                                    name='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                            </InputGroup>
                        </Form.Group>

                    </Modal.Body>

                    {/* Footer */}
                    <Modal.Footer>
                        <Button
                            type='submit'
                            variant='primary'>
                            Login
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal >
        </>
    );
}

export default LoginModal;