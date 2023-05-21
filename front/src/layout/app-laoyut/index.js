import {Outlet} from 'react-router-dom';

import NavigationBar from '../../components/widgets/header';

const AppLayout = () => {
    return <>
        <NavigationBar />
        <Outlet />
    </>
}

export default AppLayout;