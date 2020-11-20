import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Swal from 'sweetalert2';
import ExpenseList from './expenses-listing.component';

export default class ExpenseTableRow extends Component {
    constructor(props) {    
        super(props);
        this.state = {
            expenses: []
          };
        this.deleteExpense = this.deleteExpense.bind(this);
    }
         
    deleteExpense() {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete('/api/expenses/' + this.props.obj.id)
                .then((res) => {
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                      ) .then((res) =>{
                        window.location.reload();           
                      }
                      )                      
                }).catch((error) => {
                    console.log(error)
                })  }})   }
                
    render() {
        return (
            <tr>
                <td>{this.props.obj.name}</td>
                <td>{this.props.obj.amount}</td>
                <td>{this.props.obj.description}</td>
                <td>
                    <Link className="edit-link" to={"/edit-expense/" + this.props.obj.id}>
                       <Button size="sm" variant="info">Edit</Button>
                    </Link>
                    <Button onClick={this.deleteExpense} size="sm" variant="danger">Delete</Button>
                </td>
            </tr>
        );
    }
}