import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import uuid from 'uuid';
import axios from 'axios';

import FormField from '../FormField';
import Button from '../../UI/Button';

const initialState = {
};

const Form = styled.form`
display: flex;
flex-direction: column;
padding: 10px;
border: solid 1px dimgray;
border-radius: 5px;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.25), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const ButtonBlock = styled.div`
display: inline-flex;
justify-content: space-between;
margin-top: 20px;
`;

const FormTitle = styled.div`
font-family: monospace;
font-size: 1.5em;
text-align: center;
`;

export default class CreateTaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    formChangeHandler = (event) => {
        const { target } = event;
        const { name } = target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]: value,
        });
    }

    formSubmitHandler = (e) => {
        const newTask = {
            ...this.state,
            updated: Date.now(),
            created: Date.now(),
            ID: uuid(),
        };
        this.saveNewTask(newTask);
        this.reset();
        this.handleSubmit(e);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        e.target.reset();
    }

    saveNewTask = (newTask) => {
        axios.post('http://localhost:3000/api/create', newTask)
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }

    reset() {
        this.setState(initialState);
    }

    render() {
        const { formClosed, ticketCreated } = this.props;
        const { summary, description } = this.state;
        const selectOptions = [
            {
                name: 'Select…',
                value: null,
            },
            {
                name: 'Low',
                value: 'low',
            },
            {
                name: 'Medium',
                value: 'medium',
            },
            {
                name: 'High',
                value: 'high',
            },
        ];

        return (
            <Form onSubmit={this.formSubmitHandler}>
                <FormTitle>Create task</FormTitle>
                <FormField label="Sumary" name="summary" type="string" fieldElement="input" value={summary} inputChanged={this.formChangeHandler} />
                <FormField label="Description" name="description" fieldElement="textarea" value={description} inputChanged={this.formChangeHandler} />
                <FormField
                    label="Severity"
                    name="severity"
                    fieldElement="select"
                    options={selectOptions}
                    passValue={this.formChangeHandler}
                />
                <ButtonBlock>
                    <Button type="submit" title="Create task" clicked={ticketCreated} />
                    <Button color="lightcoral" title="Cancel" clicked={formClosed} />
                </ButtonBlock>
            </Form>
        );
    }
}

CreateTaskForm.propTypes = {
    formClosed: PropTypes.func,
    ticketCreated: PropTypes.func,
};

CreateTaskForm.defaultProps = {
    formClosed: null,
    ticketCreated: null,
};
