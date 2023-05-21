import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

import isEmpty from '../../services/utils/isEmpty';
import AnwyrTest from '../../services/utils/axios';

const SignUp = () => {
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const emailRef = useRef(null);
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState({
        username: null,
        password: null,
        confirmPassword: null,
        email: null,
    })
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleOnsubmit = e => {
        const form = e.currentTarget;
        const { username, password, email } = validateForm();

        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        e.preventDefault();
        setLoading(true);
        AnwyrTest.post('/auth/sign-up', {
            email,
            password,
            username
        }).then(res => {
            setLoading(false);
            navigate('/');
        }).catch(err => {
            if (err.response) {
                const { data, status, headers } = err.response;
                const resErr = {
                    username: null,
                    email: null,
                    password: null,
                }
                if (status === 422) {
                    const errArray = data.data;
                    errArray.forEach(el => {
                        if (el.path === 'email') {
                            resErr.email = el.msg
                        }
                        if (el.path === 'password') {
                            resErr.password = el.msg
                        }
                        if (el.path === 'username') {
                            resErr.username = el.msg
                        }
                    })
                }
                setError(resErr);
                setLoading(false);
            }
        })
    }

    const validateForm = () => {
        const error = {
            username: null,
            password: null,
            confirmPassword: null,
            email: null,
        };
        setError(error);

        if (isEmpty(usernameRef.current.value)) {
            error.username = "Username is Empty";
        }

        if (isEmpty(emailRef.current.value)) {
            error.email = "Email is Empty";
        }

        if (isEmpty(passwordRef.current.value)) {
            error.password = "Password is Empty";
        }
        if (isEmpty(confirmPasswordRef.current.value)) {
            error.confirmPassword = "confirm password is Empty";
        }

        setError(error);

        if (!isEmpty(passwordRef.current.value) && passwordRef.current.value.length < 5) {
            error.password = "Password must be at least 5 character";
        }

        if (!isEmpty(confirmPasswordRef.current.value) && passwordRef.current.value !== confirmPasswordRef.current.value) {
            error.confirmPassword = "Confirm password does not match password";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailRegex.test(emailRef.current.value);
        if (!isEmpty(emailRef.current.value) && !isValidEmail) {
            error.email = "Email is not valid";
        }

        return {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
            email: emailRef.current.value,
        }
    }
    return <div className="container my-5">
        <Form noValidate validated={validated} onSubmit={handleOnsubmit}>
            <Form.Group as={Row} className="mb-3" controlId='validationUsername'>
                <Form.Label column sm="2">
                    UserName
                </Form.Label>
                <Col sm="10">
                    <InputGroup hasValidation>
                        <Form.Control isInvalid={!isEmpty(error.username) ? true : false} ref={usernameRef} type='text' placeholder='your username' />
                        <Form.Control.Feedback type="invalid">
                            {error.username}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId='validationEmail'>
                <Form.Label column sm="2">
                    Email
                </Form.Label>
                <Col sm="10">
                    <InputGroup hasValidation>
                        <Form.Control isInvalid={!isEmpty(error.email) ? true : false} ref={emailRef} type='email' placeholder='email@example.com' />
                        <Form.Control.Feedback type="invalid">
                            {error.email}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId='validationPassword'>
                <Form.Label column sm="2">
                    Password
                </Form.Label>
                <Col sm="10">
                    <InputGroup hasValidation>
                        <Form.Control isInvalid={!isEmpty(error.password) ? true : false} ref={passwordRef} type="password" placeholder="Password" />
                        <Form.Control.Feedback type="invalid">
                            {error.password}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId='validationConfirmPassword'>
                <Form.Label column sm="2">
                    Confirm password
                </Form.Label>
                <Col sm="10">
                    <InputGroup hasValidation>
                        <Form.Control isInvalid={!isEmpty(error.confirmPassword) ? true : false} ref={confirmPasswordRef} type="password" placeholder="Confirm password" />
                        <Form.Control.Feedback type="invalid">
                            {error.confirmPassword}
                        </Form.Control.Feedback>
                    </InputGroup>

                </Col>
            </Form.Group>
            <div className='d-flex justify-content-end'>
                <Button type="submit" variant="secondary" size="lg">
                    {loading ? <>Loading...</> : <>Sign in</>}
                </Button>
            </div>

        </Form>
    </div>
}


export default SignUp;