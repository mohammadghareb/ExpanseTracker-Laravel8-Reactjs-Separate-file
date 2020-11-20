import React, { useMemo }  from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Nav from "react-bootstrap/Nav";
import Navbar from 'react-bootstrap/Navbar'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import "bootstrap/dist/css/bootstrap.css";
import EditExpense from "./components/edit-expense.component";
import ExpensesList from "./components/expenses-listing.component";
import CreateExpense from "./components/create-expense.component";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useCallback } from 'react';



const App = () => {
  
  const [loggedIn, setLoggedIn] = React.useState(
    sessionStorage.getItem('loggedIn') === 'true' || false
  );

  const login = useCallback(callback => {
    setLoggedIn(true);
    sessionStorage.setItem('loggedIn', true);
  },[])

  const logout = useCallback(callback => {
    axios.defaults.withCredentials = true;
    axios.post('/logout').then(response => {
      if (response.status === 204) {
        Swal.fire({
          title: 'Successfully Logout',
          icon: 'success', })
        setLoggedIn(false);
        sessionStorage.setItem('loggedIn', false);
   }})},[]) 

  let navLink = (
    <ul className="navbar-nav">
          <Nav className="justify-content-end">
      <NavLink  to="/logout" onClick={logout} className="nav-link btn btn-link">Logout</NavLink>
      <NavLink to={"/expenses-listing"}  className="nav-link">Expenses List </NavLink>
      <NavLink to={"/create-expense"}  className="nav-link">Create Expense </NavLink>
      </Nav>  
        </ul>
  );
  return (
    <div className="App">
    {loggedIn   ? (
    <Router>
     <Navbar bg="primary" variant="dark">
    <Nav className="mr-auto">
          {navLink}
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
   <Button variant="outline-light">Search</Button>
    </Form>
  </Navbar>
      <div className="container mt-5 pt-5">
        <Switch>
        <Route  path='/login' render={props => (
          <Redirect to='/expenses-listing' />  )} />
        <Route path="/create-expense" component ={CreateExpense}  />
        <Route path="/edit-expense/:id" component={EditExpense} />
        <Route path="/expenses-listing" component={ExpensesList} />
        <Route exact path='/logout' render={props => (
            <Redirect to='/' />  )} />

        </Switch>
      </div>
    </Router>):
    (
  <Router>
     <Navbar bg="primary" variant="dark">
    <Nav className="mr-auto">
    <NavLink to='/login' className="nav-link">Login</NavLink>
    </Nav>
  </Navbar>
      <div className="container mt-5 pt-5">
        <Switch>
          <Route path='/login' render={props => (
            <Login {...props} login={login} /> )} />
        </Switch>
      </div>
    </Router>
    )}
    </div>
  );
};

export default App;