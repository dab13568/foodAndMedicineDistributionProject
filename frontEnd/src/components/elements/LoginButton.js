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
    function verify(email, callback) {
        // This script should mark the current user's email address as verified in
        // your database.
        // It is executed whenever a user clicks the verification link sent by email.
        // These emails can be customized at https://manage.auth0.com/#/emails.
        // It is safe to assume that the user's email already exists in your database,
        // because verification emails, if enabled, are sent immediately after a
        // successful signup.
        //
        // There are two ways that this script can finish:
        // 1. The user's email was verified successfully
        //     callback(null, true);
        // 2. Something went wrong while trying to reach your database:
        //     callback(new Error("my error message"));
        //
        // If an error is returned, it will be passed to the query string of the page
        // where the user is being redirected to after clicking the verification link.
        // For example, returning `callback(new Error("error"))` and redirecting to
        // https://example.com would redirect to the following URL:
        //     https://example.com?email=alice%40example.com&message=error&success=false
        console.log("in loginButton callback")


        const msg = 'dev-qoc-7zii.us.auth0.com ' +
            'at https://manage.auth0.com/#/connections/database';
        return callback(new Error(msg));
    }
}

export default LoginButton