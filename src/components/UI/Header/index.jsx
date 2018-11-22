import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const Wrapper = styled.div`
display: flex;
flex-direction: column;
width: -webkit-fill-available;
top: 0;
left: 0;
padding: 40px 16px 25px 40px;
text-align: center;
`;

const Title = styled.div`
width: 100%;
font-family: monospace;
font-size: 32px;
`;

const header = ({ title, children }) => (
    <Wrapper>
        <Title>{title}</Title>
        {children}
    </Wrapper>
);

export default header;

header.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
};

header.defaultProps = {
    children: null,
};
