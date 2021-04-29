import React, { useContext, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import OtherLogIn from '../OtherLogIn/OtherLogIn';
import Form from './Form';
import './Login.css';
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../AuthConfig/firebaseConfig';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}


const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [user, setUser] = useState({
        email: false,
        password: false,
    });
    const [result, setResult] = useState({
        isLoggedIn: false,
        message: ""
    });
    const [loading, setLoading] = useState(false);
    // redirect route integrate
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    //input handle change validation
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
       if(name === "email"){
            const emailCheck = /\w{4}@(gmail|email|info|yahoo).com/.test(value);
            if(emailCheck){
                const loginUser = {...user};
                loginUser.email = value;
                setUser(loginUser);
            }else{
                const loginUser = {...user};
                loginUser.email = false;
                setUser(loginUser);
            }
       }
       if(name === "password"){
        const passCheck = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(value);
        if(passCheck){
            const loginUser = {...user};
            loginUser.password = value;
            setUser(loginUser);
        }else{
            const loginUser = {...user};
            loginUser.password = false;
            setUser(loginUser);
        }
       }
    }
    // log in submit
    const handleSubmit = (e) => {
        const {email, password} = user;
        if(email && password){
            setLoading(true);
            firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                const loginUser = userCredential.user;

                // set up auth info
                const authUser = {...loggedInUser};
                authUser.name = loginUser.displayName;
                authUser.email = loginUser.email;
                setLoggedInUser(authUser);
        
                // set up result
                const newResult = {...result};
                newResult.isLoggedIn = true;
                newResult.message = "Successfully Log In ✔✔";
                setResult(newResult);
                e.target.reset();
                setLoading(false);
                // redirect
                history.replace(from);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                // set up result
                const newResult = {...result};
                newResult.isLoggedIn = false;
                newResult.message = errorMessage;
                setResult(newResult);
                setLoading(false);
            });
        }
        e.preventDefault();
    }
    return (
        <div className="login">
           <div className="login-form">
                <h3>Login</h3>
                <Form handleChange={handleChange} user={user} handleSubmit={handleSubmit} result={result} loading={loading}/>
                <div className="alter">
                    <h4 className="text-center">Don't have an account? <Link to="/signup">Create Account</Link></h4>
                </div>
           </div>
           <OtherLogIn/>
        </div>
    );
};

export default Login;