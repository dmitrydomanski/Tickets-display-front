import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = styled.button`
border: solid 1px darkgray;
border-radius: 5px;
padding: 0 10px 0 10px;
background-color: grey;
color: beige;
height: 32px;
cursor: pointer;
width: max-content;
margin:0;
`;

const button = ({ clicked, title, color, type }) => (
    <Button
        style={{
            backgroundColor: color,
        }}
        onClick={clicked}
        type={type}
    >{title}
    </Button>
);

export default button;

button.propTypes = {
    clicked: PropTypes.func,
    title: PropTypes.string.isRequired,
    color: PropTypes.string,
    type: PropTypes.string,
};

button.defaultProps = {
    color: null,
    clicked: null,
    type: 'button',
};
