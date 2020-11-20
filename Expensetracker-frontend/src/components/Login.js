import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Login = (props) => {
    let [email, setEmail] = React.useState('');
    let [password, setPassword] = React.useState('');
    let [authError, setAuthError] = React.useState(false);
    let [unknownError, setUnknownError] = React.useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setAuthError(false);
        setUnknownError(false);
        axios.defaults.withCredentials = true;
        axios.get('/sanctum/csrf-cookie')
        .then(response => {
            axios.post('/login', {
                email: email,
                password: password
            }).then(response => {
                //No Need to use 200 with axios 
                if (response.status === 200) {
                    Swal.fire({
                        title: 'Successfully Login',
                        icon: 'success', })
                    props.login();
                }
            }).catch(error => {
                if (error.response && error.response.status === 422) {
                    setAuthError(true);
                } else {
                    setUnknownError(true);
                    console.error(error);
                }
            });
        });
    }
  
    return (
        <div>
                <h3>Login</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                        type="email"
                        name="email"
                        className={"form-control" + (authError || unknownError ? ' is-invalid' : '')}
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        name="password"
                        className={"form-control" + (authError || unknownError ? ' is-invalid' : '')}
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
                {authError ? <div className="alert alert-danger">Credentials not recognised. Please try again.</div> : null}
                {unknownError ? <div className="alert alert-danger">There was an error submitting your details.</div> : null}
                <button type="submit" className="btn btn-primary">Login</button>  
            </form>
        </div>
    );
};
export default Login;