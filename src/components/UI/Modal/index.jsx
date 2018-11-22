import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import Backdrop from '../Backdrop';

const Wrapper = styled.div`
position: fixed;
z-index: 500;
width: max-content;
transition: all 0.3s ease-out;`;

const ModalWrapper = styled.div`
align-items: center;
height: 100vh;
align-items: center;
justify-content: center;
`;

export default class Modal extends Component {
    shouldComponentUpdate(nextProps) {
        const { show } = this.props;
        return nextProps.show !== show;
    }

    render() {
        const { show, modalClosed, children } = this.props;
        return (
            <ModalWrapper style={{
                display: show ? 'flex' : 'none',
            }}
            >
                <Backdrop show={show} clicked={modalClosed} />
                <Wrapper
                    style={{
                        transform: show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: show ? '1' : '0',
                    }}
                >
                    {children}
                </Wrapper>
            </ModalWrapper>
        );
    }
}

Modal.propTypes = {
    show: PropTypes.bool.isRequired,
    modalClosed: PropTypes.func,
    children: PropTypes.node,
};

Modal.defaultProps = {
    children: null,
    modalClosed: null,
};
