import React from 'react';
import styled, { keyframes } from 'styled-components';

const Striploader = styled.div`
position: relative;
width: 120px;
height: 120px;
`;

const pulse = keyframes`
0% {
    top: 6px;
    height: 51px;
  }
  50%, 100% {
    top: 19px;
    height: 26px;
  }
`;

const LoaderElement = styled.div`
opacity: 0.8;
display: inline-block;
position: absolute;
left: 6px;
width: 13px;
background: gold;
animation: ${pulse} 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite
&:nth-child(1){
    left: 6px;
    animation-delay: -0.24s;
}
&:nth-child(2) {
    left: 26px;
    opacity: 0.65;
    animation-delay: -0.12s;
  }
&:nth-child(3) {
    left: 45px;
    opacity: 0.5;
    animation-delay: 0;
  }
`;


const loader = () => (

    <Striploader>
        <LoaderElement /><LoaderElement /><LoaderElement />
    </Striploader>
);

export default loader;
