import React, { Component } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getDatabase, ref, onValue, remove } from 'firebase/database';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            showDeleteDialog: false,
            selectedUser: {}
        };


        this.add = this.add.bind(this);
        this.closeDeleteDialog = this.closeDeleteDialog.bind(this);
        this.delete = this.delete.bind(this);
        console.log("Inside constructor showDeleteDialog");
        console.log(this.state.showDeleteDialog);
    }
    add(e) {
        window.location.replace(window.location + "add");
    }
    openDeleteDialog(user) {
        this.setState({
            showDeleteDialog: true,
            selectedUser: user
        });
    }
    closeDeleteDialog() {
        this.setState({
            showDeleteDialog: false,
            selectedUser: {}
        });
        console.log("closeDeleteDialog initiated and values of showDeleteDialog is: ");
        console.log(this.state.showDeleteDialog);
    }
    delete(e) {
        const db = getDatabase();
        remove(ref(db, '/' + this.state.selectedUser.key))
            .then(x => {
                console.log("Success");
                this.closeDeleteDialog();
            })
            .catch(error => {
                alert("Could not delete the user.");
                console.log("ERROR", error)
            });
    }
    componentDidMount() {
        const db = getDatabase();
        const starCountRef = ref(db, '/');
        console.log("List of all the users :- ");
        onValue(starCountRef, (snapshot) => {
            let returnArr = [];
            snapshot.forEach(data => {
                var user = data.val();
                console.log(user);
                console.log(data.key);
                user['key'] = data.key;
                returnArr.push(user);
            });
            this.setState({
                users: returnArr
            })
        });

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("Component did update");
        console.log("Value of showDeleteDialog is : ");
        console.log(this.state.showDeleteDialog);
        console.log("--------------------");
    }
    render() {
        const listUsers = this.state.users.map((user) =>
            <tr key={user.key}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                    <Link to={`/edit/${user.key}`}>
                        Edit
                    </Link>
                </td>
                <td>
                    <Button onClick={this.openDeleteDialog.bind(this, user)}>Remove</Button>
                </td>
            </tr>
        );
        return (
            <div>
                <Button variant="primary" onClick={this.add}>Add</Button>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listUsers}
                    </tbody>
                </Table>
                <Modal show={this.state.showDeleteDialog} onHide={this.closeDeleteDialog.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete User</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>
                            Are you sure you want to Delete&nbsp;
                            {this.state.selectedUser.username}?
                        </p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.delete.bind(this)}>
                            Delete
                        </Button>
                        <Button variant="primary" onClick={this.closeDeleteDialog.bind(this)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
export default User;