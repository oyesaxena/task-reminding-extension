import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ToastProvider } from 'react-toast-notifications';

const root = document.createElement('div');
root.className = 'container';
document.body.appendChild(root);
const rootDiv = ReactDOM.createRoot(root);
rootDiv.render(
    <React.Fragment>
        <ToastProvider>
            <App />
        </ToastProvider>
    </React.Fragment>
);
