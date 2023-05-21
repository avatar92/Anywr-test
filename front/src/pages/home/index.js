import { useRef, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

import AnwyrTest from '../../services/utils/axios';
import isEmpty from '../../services/utils/isEmpty';

const Home = () => {
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState({
        username: null,
        password: null,
    })
    const [loading, setLoading] = useState(false);

    const handleOnsubmit = event => {
        const form = event.currentTarget;
        const { username, password } = validateForm();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        event.preventDefault();
        AnwyrTest.post('/auth/login', {
            username: username,
            password: password,
        }).then(res => {
            const { data } = res;
            console.log(data);
        }).catch(err => {            
            if (err.response) {
                const {data,status,headers} = err.response;
                const resErr = {
                    username: null,
                    password: null,
                }
                if(status === 404){
                    resErr.username = "Wrong credentials";
                    resErr.password = "Wrong credentials";
                }
                setError(resErr);
            }
        })
    }

    const validateForm = () => {
        const error = {
            username: null,
            password: null
        };
        setError(error);
        if (isEmpty(usernameRef.current.value)) {
            error.username = "Username is Empty";
        }

        if (isEmpty(passwordRef.current.value)) {
            error.password = "Password is Empty";
        }

        setError(error);
        return {
            username: usernameRef.current.value,
            password: passwordRef.current.value
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
                        <Form.Control required isInvalid={!isEmpty(error.username) ? true : false} ref={usernameRef} type='text' placeholder='your username' />
                        <Form.Control.Feedback type="invalid">
                            {error.username}
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
                        <Form.Control required isInvalid={!isEmpty(error.password) ? true : false} ref={passwordRef} type="password" placeholder="Password" />
                        <Form.Control.Feedback type="invalid">
                            {error.password}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Col>
            </Form.Group>
            <div className='d-flex justify-content-end'>
                <Button type="submit" variant="secondary" size="lg">
                    {loading ? <>Loading...</> : <>Log in</>}
                </Button>
            </div>

        </Form>
    </div>
}

export default Home;