import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { sub } from 'date-fns/fp';
import { useState } from 'react';
import { InputGroup, Row } from 'react-bootstrap';
import * as yup from 'yup';
import * as formik from 'formik';

const delay = async (ms: number) => new Promise(res => setTimeout(res, ms));

// Yup validation schema
const schema = yup.object().shape({
    username: yup.string()
        .min(3, 'Your username has to be minimum 3 character long')
        .max(32, 'Your username has to be maximum 32 character long').required('Please choose a username'),
    password: yup.string()
        .min(8, 'Your password has to be minimum 8 character long')
        .max(64, 'Your password has to be maximum 64 character long')
        .required('Please choose a password'),
    confirmpassword: yup.string().test(
        'match-password',
        'Passwords must match',
        function (value) {
            return value === this.parent.password;
        }
    ),
    email: yup.string().email('Invalid email').required('Please enter your email address'),
    firstname: yup.string(),
    lastname: yup.string(),
    birthdate: yup
        .date()
        .required('Please enter your birthdate')
        .max(sub({ years: 18 }, new Date()), "You must be 18 years or older"),
    terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
});

// Register form data
const initialValues = {
    username: '',
    password: '',
    confirmpassword: '',
    email: '',
    firstname: '',
    lastname: '',
    birthdate: '',
    terms: false
}

function RegisterModal(props: {
    theme: boolean,
    show: boolean,
    setRegisterModal: () => void
}) {
    const { Formik } = formik;
    const [submitted, setSubmitted] = useState(false);
    const [backendErrors, setBackendErrors] = useState('');
    const [registerSuccess, setRegisterSuccess] = useState(false);

    // Handle submit | Send register user request if valid | Update validation if errors
    const registerUser = async (values: any) => {
        setSubmitted(true);
        await schema
            .validate(values, { abortEarly: false })
            .then(async () => {
                const data = {
                    user: {
                        username: values.username,
                        password: values.password,
                        email: values.email,
                        firstname: values.firstname,
                        lastname: values.lastname,
                        birthdate: values.birthdate
                    }
                }
                const resp = await axios.post(
                    'http://localhost:4000/api/user',
                    data,
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );

                if (resp.status === 201) {
                    setBackendErrors('');
                    setSubmitted(false);
                    setRegisterSuccess(true);
                    await delay(3000);
                    setRegisterSuccess(false);
                    props.setRegisterModal();
                }
            }).catch((e) => {
                if (e.response) setBackendErrors(e.response.data);
            });
    }

    return (
        <>
            <Modal
                show={props.show}
                onHide={() => { setBackendErrors(''); setSubmitted(false); setRegisterSuccess(false); props.setRegisterModal(); }}
                data-bs-theme={props.theme ? 'dark' : 'light'}
            >
                <Formik
                    validationSchema={schema}
                    onSubmit={registerUser}
                    enableReinitialize={true}
                    initialValues={initialValues}
                >
                    {({ handleSubmit, handleChange, values, touched, errors }) => (
                        <Form onSubmit={(e) => { e.preventDefault(); registerUser(values); handleChange; }} noValidate>
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

                                {registerSuccess ?
                                    <div style={{ paddingBottom: '10px' }}>
                                        <label style={{
                                            color: 'rgba(60, 180, 100, 1)',
                                            border: '1px solid rgba(60, 180, 100, 1)',
                                            borderRadius: '5px',
                                            width: '100%',
                                            boxSizing: 'border-box',
                                            padding: '6px 16px',
                                            background: 'rgba(60, 180, 100, 0.08)',
                                            textAlign: 'left',
                                            fontSize: '1rem'
                                        }}>
                                            Registration successful! You can now log in.
                                        </label>
                                    </div>
                                    : ''
                                }

                                {/* Username */}
                                <Form.Group controlId='validationFormikUsername'>
                                    <InputGroup hasValidation>

                                        <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>

                                        <Form.Control
                                            type='text'
                                            placeholder='username*'
                                            aria-describedby='inputGroupPrepend'
                                            name='username'
                                            value={values.username}
                                            onChange={handleChange}
                                            isInvalid={submitted && !!errors.username}
                                        />

                                        <Form.Control.Feedback type='invalid'>
                                            {errors.username}
                                        </Form.Control.Feedback>

                                    </InputGroup>
                                </Form.Group>

                                {/* Password */}
                                <Form.Group
                                    controlId='validationFormikPassword'
                                    style={{ paddingTop: '10px' }}
                                >
                                    <InputGroup hasValidation>

                                        <Form.Control
                                            type='password'
                                            placeholder='Password*'
                                            name='password'
                                            value={values.password}
                                            onChange={handleChange}
                                            isInvalid={(submitted || touched.password) && !!errors.password}
                                        />

                                        <Form.Control.Feedback type='invalid'>
                                            {errors.password}
                                        </Form.Control.Feedback>

                                    </InputGroup>
                                </Form.Group>

                                {/* Re-type password */}
                                <Form.Group
                                    controlId='validationFormikConfirmPassword'
                                    style={{ paddingTop: '10px' }}
                                >
                                    <InputGroup hasValidation>

                                        <Form.Control
                                            type='password'
                                            placeholder='Re-type password*'
                                            name='confirmpassword'
                                            value={values.confirmpassword}
                                            onChange={handleChange}
                                            isInvalid={(submitted || touched.confirmpassword) && !!errors.confirmpassword}
                                        />

                                        <Form.Control.Feedback type='invalid'>
                                            {errors.confirmpassword}
                                        </Form.Control.Feedback>

                                    </InputGroup>
                                </Form.Group>

                                {/* Email */}
                                <Form.Group
                                    controlId='validationFormikConfirmPassword'
                                    style={{ paddingTop: '10px' }}
                                >
                                    <InputGroup hasValidation>

                                        <Form.Control
                                            type='email'
                                            placeholder='example@email.com*'
                                            name='email'
                                            value={values.email}
                                            onChange={handleChange}
                                            isInvalid={(submitted || touched.email) && !!errors.email}
                                        />

                                        <Form.Control.Feedback type='invalid'>
                                            {errors.email}
                                        </Form.Control.Feedback>

                                    </InputGroup>
                                </Form.Group>

                                {/* First and last name */}
                                <div style={{ paddingTop: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Form.Group controlId='validationFormikFirstName'>
                                        <Form.Control
                                            type='string'
                                            placeholder='First name'
                                            name='firstname'
                                            value={values.firstname}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId='validationFormikLastName'>
                                        <Form.Control
                                            type='string'
                                            placeholder='Last name'
                                            name='lastname'
                                            value={values.lastname}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </div>

                                {/* Birthdate */}
                                <Form.Group
                                    controlId='validationFormikBirthdate'
                                    style={{ paddingTop: '10px' }}
                                >
                                    <InputGroup hasValidation>

                                        <Form.Control
                                            type='date'
                                            name='birthdate'
                                            value={values.birthdate}
                                            onChange={handleChange}
                                            isInvalid={(submitted || touched.birthdate) && !!errors.birthdate}
                                        />

                                        <Form.Control.Feedback type='invalid'>
                                            {errors.birthdate}
                                        </Form.Control.Feedback>

                                    </InputGroup>
                                </Form.Group>

                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Form.Group
                                        controlId='validationFormikTerms'
                                        style={{ paddingTop: '10px' }}
                                    >
                                        <InputGroup hasValidation>

                                            <Form.Check
                                                name='terms'
                                                label='Agree to terms and conditions'
                                                onChange={handleChange}
                                                isInvalid={(submitted || touched.birthdate) && !!errors.terms}
                                                feedback={errors.terms}
                                                feedbackType='invalid'
                                                id="validationFormikTerms"
                                                feedbackTooltip
                                            >
                                            </Form.Check>

                                        </InputGroup>

                                    </Form.Group>

                                    <label style={{ float: 'right', paddingTop: '10px', fontSize: '11px' }}>* Required</label>
                                </div>

                            </Modal.Body>

                            {/* Footer */}
                            <Modal.Footer>
                                <Button
                                    type='submit'
                                    variant='primary'>
                                    Register
                                </Button>
                            </Modal.Footer>
                        </Form>
                    )}
                </Formik>
            </Modal >
        </>
    );
}

export default RegisterModal;