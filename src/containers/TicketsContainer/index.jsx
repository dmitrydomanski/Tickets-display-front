import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Ticket from './Ticket';

const Wrapper = styled.div`
display: flex;
flex-direction: column;
margin: 10px;
padding: 0 0 10px 5px;
border-radius: 10px;
width: 30%;
border: solid 1px gray;
`;

const TicketsArea = styled.div`
height: 500px;
overflow-y: auto;
`;

const Title = styled.div`
text-align: center;
vertical-align: middle;
line-height: 40px;
font-size: 1.5em;
background-color: lightgrey;
margin: 0px 0 0 -5px;
border-radius: 5px 5px 0 0;
z-index: -1;
height: 40px;
font-family: monospace;
`;


export default class TicketsContainer extends Component {
    pickColor = (severity) => {
        let color;
        switch (severity) {
        default:
            color = 'aliceblue';
            break;

        case 'medium':
            color = 'palegreen';
            break;

        case 'high':
            color = 'navajowhite';
            break;
        }
        return color;
    }

    render() {
        const { tickets, title, updateTicket } = this.props;
        return (
            <Wrapper>
                <Title>{title}({tickets.length})</Title>
                <TicketsArea>
                    {tickets.map((ticket, index) => (
                        <Ticket
                            key={parseInt(index.toString(), 10)}
                            summary={ticket.summary}
                            description={ticket.description}
                            status={ticket.status}
                            severity={ticket.severity}
                            updateTicket={updateTicket}
                            currentColor={this.pickColor(ticket.severity)}
                            ID={ticket.ID}
                        />
                    ))}
                </TicketsArea>
            </Wrapper>
        );
    }
}

TicketsContainer.propTypes = {
    tickets: PropTypes.arrayOf(Object),
    title: PropTypes.string,
    updateTicket: PropTypes.func,
};

TicketsContainer.defaultProps = {
    tickets: null,
    title: null,
    updateTicket: null,
};
