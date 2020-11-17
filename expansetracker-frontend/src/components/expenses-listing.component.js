import React, { Component } from "react";
import Table from 'react-bootstrap/Table';
import ExpenseTableRow from './ExpenseTableRow';
import Axios from 'axios';

export default class ExpenseList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expenses: []
    };
  }

  componentDidMount() {

    Axios.get('/api/list-expenses/')
      .then(res => {
        this.setState({
          expenses: res.data
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  DataTable() {
    return this.state.expenses.map((res, i) => {
      return <ExpenseTableRow obj={res} key={i} />;
    });
  }


  render() {
    if(sessionStorage.getItem('loggedIn')== 'true')
    {
      console.log('logenin')
      return (
        <div className="table-wrapper">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Amount</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.DataTable()}
            </tbody>
          </Table>
        </div>);
    }
    else{
     return (
      <div className="alert alert-warning" >You are not loggen in.   </div>
     );

    }
    
  }
}