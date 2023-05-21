import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import isEmpty from '../../../services/utils/isEmpty';


function NavigationBar({ user = {} }) {
    const handleClick = e => {
        e.preventDefault();
        console.log('logout');
    }
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Link to="/">
                    <Navbar.Brand>Anwyr</Navbar.Brand>
                </Link>
                <Nav className="me-auto">
                    {
                        isEmpty(user) && <>
                            <Link to="/">
                                <Nav.Link>Sign in</Nav.Link>
                            </Link>

                            <Link to="/sign-up">
                                <Nav.Link>Sign up</Nav.Link>
                            </Link>

                        </>
                    }
                    {
                        !isEmpty(user) && <>
                            <Link to="/profile">
                                <Nav.Link>Profile</Nav.Link>
                            </Link>
                            
                            <Nav.Link onClick={handleClick}>Sign out</Nav.Link>
                        </>
                    }

                </Nav>
            </Container>
        </Navbar>
    );
}

NavigationBar.propTypes = {
    user: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    user: state.user,
})

export default connect(mapStateToProps, {})(NavigationBar);