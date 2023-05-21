import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

import AnwyrTest from "../../services/utils/axios";
import { setUser } from '../../services/reducers/user/actions';
import { connect } from "react-redux";


const Profile = ({ setUser }) => {
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);
    useEffect(() => {
        AnwyrTest.get('/dash/info').then(res => {
            setCurrentUser(res.data);
            setLoading(false);
        }).catch(err => {
            if (err.response) {
                const { data, status, headers } = err.response;
                if (status === 401) {
                    setUser({})
                }
                setLoading(false);
            }
        })
    }, [])
    return <div className="container">
        {loading ? <h1>Loading...</h1> : <>
            <p>
                email : {currentUser.email}
            </p>
            <p>
                username : {currentUser.username}
            </p>
        </>}

    </div>
}

Profile.propTypes = {
    setUser: PropTypes.func.isRequired,
};

export default connect(null, { setUser })(Profile);