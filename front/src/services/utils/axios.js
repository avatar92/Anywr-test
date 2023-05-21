import axios from 'axios';


const AnwyrTest  = axios.create({
    baseURL : 'http://localhost:5000/',
});


export default AnwyrTest;