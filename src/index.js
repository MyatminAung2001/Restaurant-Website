import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import { StateProvider } from './context/StateProvider';
import { initialState } from './context/InitialState';
import reducer from './context/Reducer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(    
    <BrowserRouter>
        <StateProvider initialState={initialState} reducer={reducer}>
            <App />
        </StateProvider>
    </BrowserRouter>
);