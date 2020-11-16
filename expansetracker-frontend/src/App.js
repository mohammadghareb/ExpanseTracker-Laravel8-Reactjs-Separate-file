import React from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import Login from './components/Login';
import apiClient from './services/api';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.css";


const App = () => {
  const [loggedIn, setLoggedIn] = React.useState(
    sessionStorage.getItem('loggedIn') === 'true' || false
  );
  const login = () => {
    setLoggedIn(true);
    sessionStorage.setItem('loggedIn', true);
  };
  const logout = () => {
    apiClient.post('/logout').then(response => {
      if (response.status === 204) {
        setLoggedIn(false);
        sessionStorage.setItem('loggedIn', false);
   }
    })
  };
  const authLink = loggedIn 
    ? <button onClick={logout} className="nav-link btn btn-link">Logout</button>
    : <NavLink to='/login' className="nav-link">Login</NavLink>;
   const authList = loggedIn 
   ? <NavLink to={"/expenses-listing"}  className="nav-link">Expenses List </NavLink>
   :false;
   const authCreate=loggedIn 
   ? <NavLink to={"/expenses-listing"}  className="nav-link">Create Expense </NavLink>
   :false;

  return (
    <Router>

      <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav">
          
          <Nav className="justify-content-end">
            {authLink}
            {authList}
            {authCreate}
            </Nav>

          
        </ul>
        </div>
      </nav>
      <div className="container mt-5 pt-5">
        <Switch>
         
          <Route path='/login' render={props => (
            <Login {...props} login={login} />
          )} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;