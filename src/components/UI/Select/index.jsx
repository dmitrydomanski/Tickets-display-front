import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';


const Select = styled.select`
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

const select = (props) => {
    const { options, passValue, name } = props;
    const handleChange = event => passValue(event);

    return (
        <Select onChange={handleChange} defaultValue="?" name={name}>
            {options.map(option => (
                <option key={option.value} value={option.value}>{option.name}</option>
            ))}
        </Select>
    );
};

export default select;

select.propTypes = {
    options: PropTypes.arrayOf(String).isRequired,
    passValue: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
};
