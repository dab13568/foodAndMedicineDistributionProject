import React from "react";
import {useAuth0} from "@auth0/auth0-react";
import { Link } from 'react-router-dom';

const LogoutButton = () => {
    const { logout,isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
            <Link  className="button button-primary button-wide-mobile button-sm  header-nav-right" onClick={()=>logout()}>
            logout
            </Link>
    ))
}

export default LogoutButton