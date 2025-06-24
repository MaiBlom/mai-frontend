import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import { FormEvent, useState } from 'react';

function RegisterModal(props: {
    theme: boolean,
    show: boolean,
    setRegisterModal: () => void
}) {
    const [validated, setValidated] = useState(false);

    const RegisterUser = async (event: FormEvent) => {
        console.log(event.currentTarget);
        /* try {
            const response = await axios.post('http://localhost:4000/api/user/', {
                "username": 'blabla',
                "password": 'blabla',
                "email": 'blabla',
                "firstname": 'blabla',
                "lastname": 'blabla',
                "birthdate": 'blabla',
            });
            console.log(response);
        } catch (error) {
            console.error('Error registering user', error);
        } */
    }

    return (
        <>
            <Modal
                show={props.show}
                onHide={props.setRegisterModal}
                data-bs-theme={props.theme ? 'dark' : 'light'}
            >
                <Form noValidate validated={validated} onSubmit={RegisterUser}>
                    <Modal.Header closeButton>
                        <Modal.Title>Register</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId='RegisterForm.Username'>
                            <Form.Label>Username*</Form.Label>
                            <Form.Control />
                        </Form.Group>
                        <Form.Group
                            controlId='RegisterForm.Password'
                            style={{ paddingTop: '10px' }}
                        >
                            <Form.Label>Password*</Form.Label>
                            <Form.Control type='password' />
                        </Form.Group>
                        <Form.Group
                            controlId='RegisterForm.Password'
                            style={{ paddingTop: '10px' }}
                        >
                            <Form.Label>Re-type password*</Form.Label>
                            <Form.Control type='password' />
                        </Form.Group>
                        <Form.Group
                            controlId='RegisterForm.Email'
                            style={{ paddingTop: '10px' }}
                        >
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='example@email.com'
                            />
                        </Form.Group>
                        <div style={{ paddingTop: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Form.Group controlId='RegisterForm.FirstName'>
                                <Form.Label>First name</Form.Label>
                                <Form.Control />
                            </Form.Group>
                            <Form.Group controlId='RegisterForm.LastName'>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control />
                            </Form.Group>
                        </div>
                        <Form.Group
                            controlId='RegisterForm.Birthdate'
                            style={{ paddingTop: '10px' }}
                        >
                            <Form.Label>Birthdate*</Form.Label>
                            <Form.Control type='date' />
                        </Form.Group>
                        <Form.Label style={{ fontSize: '11px' }}>* Mandatory fields</Form.Label>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type='submit' variant='primary' onClick={RegisterUser}>
                            Register
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

export default RegisterModal;