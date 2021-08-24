import React from "react";
import {useAuth0} from "@auth0/auth0-react";
import { Link } from 'react-router-dom';

const LoginButton = () => {
    const { loginWithRedirect,isAuthenticated } = useAuth0();
    const {isLoading} = useAuth0 ();
    if(isLoading)
    {
        console.log("here");
        return <div>Loading...</div>
    }
    return (
        !isAuthenticated && (
            <Link  className="button button-primary button-wide-mobile button-sm  header-nav-right" onClick={()=>loginWithRedirect()}>
            login
            </Link>
    ))
}

export default LoginButton