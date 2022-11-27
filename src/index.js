import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // react redux
import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

import { GoogleOAuthProvider } from '@react-oauth/google';
import env from "react-dotenv";

import App from './App';
import './index.css';


const store = createStore(reducers, compose(applyMiddleware(thunk)));
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <>
    <Provider store = {store}>
        <GoogleOAuthProvider clientId={`${env.GOOGLE_CLIENT_ID}`}>
            <App />
        </GoogleOAuthProvider>
    </Provider>
    </>
);