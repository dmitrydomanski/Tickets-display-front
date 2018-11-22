import React, { Component } from 'react';
import axios from 'axios';

import Aux from '../../components/HOC/Aux';
import Header from '../../components/UI/Header';
import Section from '../../components/UI/Section';
import SearchInput from '../../components/UI/SearchInput';
import Modal from '../../components/UI/Modal';

import TicketsContainer from '../TicketsContainer';
import CreateTicketForm from '../../components/forms/CreateTicketForm';
import UpdateTicketForm from '../../components/forms/UpdateTicketForm';

const statuses = {
    open: 'open',
    inProgress: 'in-progress',
    done: 'done',
};

export default class HomePage extends Component {
    state = {
        newTicket: false,
        updTicket: false,
    }

    componentDidMount() {
        this.getAllTickets('tickets');
    }

    getAllTickets = async (prop) => {
        await axios.get('http://localhost:3000/api/search')
            .then((response) => {
                this.setState({
                    [prop]: response.data.sort((a, b) => b.updated - a.updated),
                });
            });
    }

    updateTicketHandler = (summary, description, status, severity, ID) => {
        this.setState({
            defaultValues: {
                summary,
                description,
                status,
                severity,
                ID,
            },
        });
        this.setState({
            updTicket: true,
        });
    }

    updateTicketCancelHandler = () => {
        this.setState({
            updTicket: false,
        });
    }

    createTicketHandler = () => {
        this.setState({
            newTicket: true,
        });
    }

    ticketCreatedHandler = () => {
        this.getAllTickets('tickets');
        this.setState({
            newTicket: false,
        });
    }

    ticketUpdatedHandler = () => {
        this.getAllTickets('tickets');
        this.setState({
            updTicket: false,
        });
    }

    createTicketCancelHandler = () => {
        this.setState({
            newTicket: false,
        });
    }

    searchFilter = (array, value, propA, propB) => array
        .filter(item => item[propA].includes(value) || item[propB].includes(value));


    performSearch = (value) => {
        const { pocket } = this.state;
        this.getAllTickets('pocket')
            .then(
                this.setState({
                    tickets: this.searchFilter(pocket, value, 'summary', 'description'),
                }), err => console.log(err),
            );
    }

    render() {
        const { tickets, newTicket, updTicket, defaultValues } = this.state;
        return (
            <Aux>
                <Modal show={newTicket} modalClosed={this.createTicketCancelHandler}>
                    <CreateTicketForm
                        ticketCreated={this.ticketCreatedHandler}
                        formClosed={this.createTicketCancelHandler}
                    />
                </Modal>

                <Modal show={updTicket} modalClosed={this.updateTicketCancelHandler}>
                    <UpdateTicketForm
                        defaultValues={defaultValues}
                        ticketUpdated={this.ticketUpdatedHandler}
                        formClosed={this.updateTicketCancelHandler}
                    />
                </Modal>

                <Header title="Track your Tickets">
                    <SearchInput
                        onSearch={this.performSearch}
                        innerButtonClick={this.createTicketHandler}
                    />
                </Header>

                {tickets && tickets.length > 0
                    ? (
                        <Section>
                            <TicketsContainer
                                tickets={tickets.filter(ticket => ticket.status === statuses.open)}
                                title="OPEN"
                                updateTicket={this.updateTicketHandler}
                            />
                            <TicketsContainer
                                tickets={tickets
                                    .filter(ticket => ticket.status === statuses.inProgress)}
                                title="IN PROGRESS"
                                updateTicket={this.updateTicketHandler}
                            />
                            <TicketsContainer
                                tickets={tickets.filter(ticket => ticket.status === statuses.done)}
                                title="DONE"
                                updateTicket={this.updateTicketHandler}
                            />
                        </Section>)
                    : <div> loading... </div>
                }


            </Aux>
        );
    }
}
