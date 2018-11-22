import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Aux from '../../HOC/Aux';
import Select from '../../UI/Select';

const FormField = styled.div`
display: flex;
justify-content: flex-end;
padding: 10px;
`;

const Field = styled.input`
width: 252px;
`;
const formField = ({
    label, name, type, inputChanged,
    fieldElement, options, passValue, defaultValue,
}) => {
    let formElement = null;
    switch (fieldElement) {
    case 'input':
        formElement = <Field name={name} type={type} onChange={inputChanged} defaultValue={defaultValue} />;
        break;
    case 'textarea':
        formElement = <textarea name={name} cols="30" rows="10" onChange={inputChanged} defaultValue={defaultValue} />;
        break;
    case 'select':
        formElement = <Select options={options} name={name} passValue={passValue} defaultValue={defaultValue} />;
        break;
    default: formElement = null;
    }
    return (
        <Aux>
            <label htmlFor={name}> {label}
                <FormField>
                    {formElement}
                </FormField>
            </label>
        </Aux>
    );
};

export default formField;

formField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    inputChanged: PropTypes.func,
    fieldElement: PropTypes.string,
    options: PropTypes.arrayOf(String),
    passValue: PropTypes.func,
    defaultValue: PropTypes.string,
};

formField.defaultProps = {
    type: null,
    fieldElement: null,
    options: null,
    passValue: null,
    inputChanged: null,
    defaultValue: '',

};
