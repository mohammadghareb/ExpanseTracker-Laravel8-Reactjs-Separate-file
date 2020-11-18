import React from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import Login from './components/Login';
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.css";
import EditExpense from "./components/edit-expense.component";
import ExpensesList from "./components/expenses-listing.component";
import CreateExpense from "./components/create-expense.component";
import axios from 'axios';
import Swal from 'sweetalert2';


const App = () => {
  const [loggedIn, setLoggedIn] = React.useState(
    sessionStorage.getItem('loggedIn') === 'true' || false
  );
  const login = () => {
    setLoggedIn(true);
    sessionStorage.setItem('loggedIn', true);
  };
  const logout = () => {
    axios.defaults.withCredentials = true;
    axios.post('/logout').then(response => {
      if (response.status === 204) {
        Swal.fire({
          title: 'Successfully Logout',
          icon: 'success', })
        setLoggedIn(false);
        sessionStorage.setItem('loggedIn', false);
   }
    })
  

  };
  const authLink = loggedIn 
    ? <NavLink  to="/login  " onClick={logout} className="nav-link btn btn-link">Logout</NavLink>
    : <NavLink to='/login' className="nav-link">Login</NavLink>;
   const authList = loggedIn 
   ? <NavLink to={"/expenses-listing"}  className="nav-link">Expenses List </NavLink>
   :false;
   const authCreate=loggedIn 
   ? <NavLink to={"/create-expense"}  className="nav-link">Create Expense </NavLink>
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
        <Route path="/create-expense" component={CreateExpense} 
                 />
        <Route path="/edit-expense/:id" component={EditExpense} />
        <Route path="/expenses-listing" component={ExpensesList} />
          <Route path='/login' render={props => (
            <Login {...props} login={login} />
          )} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;