import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const Wrapper = styled.div`
font-family: monospace;
font-size: 24px;
color: crimson;
`;

const informer = (props) => {
    const { title } = props;
    return (
        <Wrapper>
            {title}
        </Wrapper>
    );
};

export default informer;

informer.propTypes = {
    title: PropTypes.string,
};

informer.defaultProps = {
    title: null,
};
