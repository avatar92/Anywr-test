import {Link} from 'react-router-dom';


const Dashboard = () => {
    return <div class="container">
        <h1>Go To <Link to="/dashboard/profile">Profile</Link></h1>
    </div>
}

export default Dashboard;