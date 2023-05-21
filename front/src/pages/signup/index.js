import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

const SignUp = () => {
    const handleOnsubmit = e => {
        e.preventDefault();
        
    }
    return <div className="container my-5">
    <Form onSubmit={handleOnsubmit}>
        <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
                UserName
            </Form.Label>
            <Col sm="10">
                <Form.Control type='text' placeholder='your username' />
            </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
                Email
            </Form.Label>
            <Col sm="10">
                <Form.Control type='email' placeholder='email@example.com' />
            </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
                Password
            </Form.Label>
            <Col sm="10">
                <Form.Control type="password" placeholder="Password" />
            </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
                Confirm password
            </Form.Label>
            <Col sm="10">
                <Form.Control type="password" placeholder="Confirm password" />
            </Col>
        </Form.Group>
        <div className='d-flex justify-content-end'>
            <Button type="submit" variant="secondary" size="lg">
                Sign in
            </Button>
        </div>

    </Form>
</div>
}


export default SignUp;