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

export default class UpdateTicketForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            summary: props.defaultValues.summary,
            description: props.defaultValues.description,
            status: props.defaultValues.status,
            severity: props.defaultValues.severity,
            ID: props.defaultValues.ID,
        };
    }

    componentWillReceiveProps(props) {
        this.setState({
            summary: props.defaultValues.summary,
            description: props.defaultValues.description,
            status: props.defaultValues.status,
            severity: props.defaultValues.severity,
            ID: props.defaultValues.ID,
        });
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
        };
        this.updateTicket(newTask);
        this.reset();
        this.handleSubmit(e);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        e.target.reset();
    }

    updateTicket = (newTask) => {
        axios.post('http://localhost:3000/api/update', newTask)
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }

    reset() {
        this.setState(initialState);
    }

    render() {
        const { formClosed, ticketUpdated, defaultValues } = this.props;
        const severitySelectOptions = [
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
        const statusSelectOptions = [
            {
                name: 'Select…',
                value: 'null',
            },
            {
                name: 'Open',
                value: 'open',
            },
            {
                name: 'In progress',
                value: 'inProgress',
            },
            {
                name: 'Done',
                value: 'done',
            },
        ];

        return (
            <Form onSubmit={this.formSubmitHandler}>
                <FormTitle>Update ticket</FormTitle>
                <FormField
                    label="Sumary"
                    name="summary"
                    type="text"
                    fieldElement="input"
                    inputChanged={this.formChangeHandler}
                    defaultValue={defaultValues.summary}
                />
                <FormField
                    label="Description"
                    name="description"
                    fieldElement="textarea"
                    inputChanged={this.formChangeHandler}
                    defaultValue={defaultValues.description}
                />
                <FormField
                    label="Status"
                    name="status"
                    fieldElement="select"
                    options={statusSelectOptions}
                    passValue={this.formChangeHandler}
                    defaultValue={defaultValues.status}
                />
                <FormField
                    label="Severity"
                    name="severity"
                    fieldElement="select"
                    options={severitySelectOptions}
                    passValue={this.formChangeHandler}
                    defaultValue={defaultValues.severity}
                />
                <ButtonBlock>
                    <Button type="submit" title="Update ticket" clicked={ticketUpdated} />
                    <Button color="lightcoral" title="Cancel" clicked={formClosed} />
                </ButtonBlock>
            </Form>
        );
    }
}

UpdateTicketForm.propTypes = {
    formClosed: PropTypes.func,
    ticketUpdated: PropTypes.func,
    defaultValues: PropTypes.instanceOf(Object),
};

UpdateTicketForm.defaultProps = {
    formClosed: null,
    ticketUpdated: null,
    defaultValues: PropTypes.instanceOf(Object),
};
