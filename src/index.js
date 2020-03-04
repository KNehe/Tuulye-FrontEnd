import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import { createStore} from 'redux';
import reducer from './Store/reducer';
import {Provider} from 'react-redux';

const store = createStore(reducer);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
       </BrowserRouter>
    </Provider>

);
ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
