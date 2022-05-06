import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { getDatabase, ref, push, onValue } from 'firebase/database';
import { useParams } from 'react-router-dom';

class UserFormTemplate extends Component {
    title;
    id;

    constructor(props) {
        super(props);
        this.id = props.id;
        this.title = 'New User';
        this.state = {
            username: '',
            email: '',
        };
        if (this.id) {
            this.title = 'Edit User';
            console.log("title has got updated inside constructor");
        }
    }
    componentDidMount() {
        if (this.id) {
            const db = getDatabase();
            const starCountRef = ref(db, '/' + this.id);
            onValue(starCountRef, (snapshot) => {
                this.setState({
                    username: snapshot.val().username,
                    email: snapshot.val().email,
                });
            });
        }
    }
    render() {
        return (
            <div>
                <h1>{this.title}</h1>
                <Formik
                    enableReinitialize={true}
                    initialValues={{ 
                        username: this.state.username,
                         email: this.state.email
                     }}
                    validate={values => {
                        let errors = {};
                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Invalid email address';
                        }
                        else if (values.email.length < 10) {
                            errors.email = 'Email address too short';
                        }

                        if (!values.username) {
                            errors.username = 'Required';
                        }
                        else if (values.username.length < 3) {
                            errors.username = 'username too short';
                        }
                        return errors;
                    }}
                    onSubmit={(values) => {
                        setTimeout(() => {
                            // actual submit logic...
                            const db = getDatabase();
                            push(ref(db, '/'), {
                                username: values.username,
                                email: values.email
                            }).then(() => window.location.replace("http://localhost:3000"));
                        }, 400);
                    }}
                >
                    <Form>
                        <Field type="email" name="email" />
                        <span style={{ color: 'red', fontWeight: 'bold' }}>
                            <ErrorMessage name="email" component="div" />
                        </span>
                        <Field type="text" name="username" />
                        <span style={{ color: 'red', fontWeight: 'bold' }}>
                            <ErrorMessage name="username" component="div" />
                        </span>
                        <button type="submit">
                            Submit
                        </button>
                    </Form>
                </Formik>
            </div>
        )
    }
}

const UserForm = props => {

    const { id } = useParams();

    return (
        <UserFormTemplate {...props} id={id} />
    )
}

export default UserForm;