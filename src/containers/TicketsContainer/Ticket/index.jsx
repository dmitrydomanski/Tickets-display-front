import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Ticket = styled.div`
display: inline-block;
padding: 5px 10px;
margin: 5px;
border: solid 1px skyblue;
border-radius: 5px;
width: -webkit-fill-available;
cursor: pointer;
background-color: ${props => props.currentColor}
`;

const TicketTitle = styled.div`
font-size: 1.5em;
margin-bottom: 5px;
`;

const StatusBar = styled.div`
display: flex;
justify-content: space-between;
margin-top: 10px;
`;

const ticket = ({ summary, description, status, severity, currentColor, updateTicket, ID }) => {
    const handleClick = (tSummary, tDescription,
        tStatus, tSevrity, tID) => () => updateTicket(tSummary, tDescription, tStatus, tSevrity, tID);

    return (
        <Ticket
            onClick={handleClick(summary, description, status, severity, ID)}
            style={{
                backgroundColor: currentColor,
            }}
        >
            <TicketTitle>{summary}</TicketTitle>
            <div>{description}</div>
            <StatusBar>
                <div><strong>Status: </strong> {status}</div>
                <div><strong>Severity: </strong> {severity}</div>
            </StatusBar>
        </Ticket>
    );
};

export default ticket;

ticket.propTypes = {
    summary: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.string,
    severity: PropTypes.string,
    currentColor: PropTypes.string,
    ID: PropTypes.string,
    updateTicket: PropTypes.func,
};

ticket.defaultProps = {
    summary: null,
    description: null,
    status: null,
    severity: null,
    currentColor: null,
    ID: null,
    updateTicket: null,
};
