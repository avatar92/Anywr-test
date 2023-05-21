import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

const Home = () => {
    const handleOnsubmit = e => {
        e.preventDefault();
        
    }
    return <div className="container my-5">
        <Form onSubmit={handleOnsubmit}>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                    UserName
                </Form.Label>
                <Col sm="10">
                    <Form.Control type='text' placeholder='your username' />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                <Form.Label column sm="2">
                    Password
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="password" placeholder="Password" />
                </Col>
            </Form.Group>
            <div className='d-flex justify-content-end'>
                <Button type="submit" variant="secondary" size="lg">
                    Log in
                </Button>
            </div>

        </Form>
    </div>
}

export default Home;