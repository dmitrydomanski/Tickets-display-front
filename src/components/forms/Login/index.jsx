import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom';

import FormField from '../FormField';
import Button from '../../UI/Button';

const Form = styled.form`
margin: 300px auto;
width: 30%;
display: flex;
flex-direction: column;
padding: 10px;
border: solid 1px dimgray;
border-radius: 5px;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.25), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const FormTitle = styled.div`
font-family: monospace;
font-size: 1.5em;
text-align: center;
`;

const users = [
    {
        username: 'user1', password: 'user1',
    },
    {
        username: 'user2', password: '1234',
    },
];

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
        };
    }

    formChangeHandler = (event) => {
        const { target } = event;
        const { name } = target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]: value,
        });
    }

    formSubmitHandler = (event) => {
        const { username, password } = this.state;
        event.preventDefault();
        this.login(username, password);
    }

    login = (username, password) => {
        const { history } = this.props;
        const user = users.find(aUser => aUser.username === username);
        if (user) {
            return user.password === password ? history.push('/tickets') : this.setState({
                loginError: 'password is invalid',
            });
        }
        this.setState({
            loginError: 'user is invalid',
        });
    }


    render() {
        return (
            <Form onSubmit={this.formSubmitHandler}>
                <FormTitle>Log in to continue</FormTitle>
                <FormField label="Enter username" name="username" type="text" fieldElement="input" inputChanged={this.formChangeHandler} />
                <FormField label="Enter password" name="password" type="text" fieldElement="input" inputChanged={this.formChangeHandler} />

                <Button type="submit" title="Log in" />
            </Form>
        );
    }
}

Login.propTypes = {
    history: PropTypes.instanceOf(Object).isRequired,
};
