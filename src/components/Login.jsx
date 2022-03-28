import React from "react";
import "./Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "./firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";

function Login() {
    const [{},dispatch] = useStateValue();


    const signIn = () => {
        auth.signInWithPopup(provider).then(result =>
            {dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            })}
            ).catch(error => alert(error.message));
    };

    return (
        <div className="login">
           <div className="login__container">
                <div className="login_text">
                    <h1>Scribe</h1>
                </div>
                <Button type="submit" onClick={signIn}>Sign in With Google</Button>
                
           </div>
        </div>
    );
}

export default Login;
