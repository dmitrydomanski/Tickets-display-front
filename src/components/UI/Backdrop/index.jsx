import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
width: 100%;
height: 100%;
position: fixed;
z-index: 100;
left: 0;
top: 0;
background-color:ghostwhite;
`;

const backdrop = ({ show, clicked }) => (
    show
        ? (
            <Wrapper
                role="link"
                tabIndex="-1"
                onClick={clicked}
                onKeyPress={clicked}
            />
        )
        : null
);

backdrop.propTypes = {
    show: PropTypes.bool.isRequired,
    clicked: PropTypes.func,
};

backdrop.defaultProps = {
    clicked: null,
};

export default backdrop;
