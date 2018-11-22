
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/app';

const container = document.createElement('div');
document.body.appendChild(container);

ReactDom.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>, container,
);
