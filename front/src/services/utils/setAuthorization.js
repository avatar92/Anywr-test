import AnwyrTest from "./axios";

const setAuth = (token=null) => {
    if(token){
        AnwyrTest.defaults.headers['Authorization'] = `Bearer ${token}`;
    }else{
        delete AnwyrTest.defaults.headers.common["Authorization"];
    }

    
}

export default setAuth;