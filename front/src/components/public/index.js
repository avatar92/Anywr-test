import { Navigate } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import isEmpty from '../../services/utils/isEmpty';

const Public = ({user,children}) => {
    if(!isEmpty(user)){
        return <Navigate to="/dashboard"  replace />
    }
    return children;
}


Public.propTypes = {
    user: PropTypes.object.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}


const mapStateToProps = state => ({
    user: state.user,
})

export default connect(mapStateToProps,{})(Public);