import React from "react";
import {useAuth0} from "@auth0/auth0-react";





const AddUserButtonTemp = () => {

    const { isLoading,isAuthenticated,user } = useAuth0();

    const handleIncludeAddress = async () => {
        if(!isLoading && isAuthenticated)
        {
            user.city="רמת גן"
            user.street="הירדן"
            user.type="manager"
            const payload = { user}

            await fetch('/users/add-user',{
                method: "POST",
                body: JSON.stringify(payload),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }).then(response => {
                window.alert("user inserted successfully")

            })
        }

    }

    return (
        <div>
            <button className="button button-primary button-wide-mobile button-sm"
                    onClick={() => handleIncludeAddress()}> temp insert user</button>
        </div>
    );
}

export default AddUserButtonTemp