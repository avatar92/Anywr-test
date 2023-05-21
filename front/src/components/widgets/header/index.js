import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import isEmpty from '../../../services/utils/isEmpty';
import { setUser } from '../../../services/reducers/user/actions';
import setAuth from '../../../services/utils/setAuthorization';

function NavigationBar({ user = {},setUser }) {
    const handleClick = e => {
        e.preventDefault();
        localStorage.removeItem('anwyr_test_user');
        setAuth(null);
        setUser({});
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
                            <Link to="/" className='nav-link'>
                                Sign in
                            </Link>

                            <Link to="/sign-up" className='nav-link'>
                                Sign up
                            </Link>

                        </>
                    }
                    {
                        !isEmpty(user) && <>
                            <Link to="/dashboard/profile" className='nav-link'>
                                Profile
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
    setUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    user: state.user,
})

export default connect(mapStateToProps, { setUser })(NavigationBar);