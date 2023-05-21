import { Navigate } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import isEmpty from '../../services/utils/isEmpty';

const Protected = ({user,children}) => {
    if(isEmpty(user)){
        return <Navigate to="/"  replace />
    }
    return children;
}


Protected.propTypes = {
    user: PropTypes.object.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}


const mapStateToProps = state => ({
    user: state.user,
})

export default connect(mapStateToProps,{})(Protected);