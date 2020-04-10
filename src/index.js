import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import { createStore,combineReducers} from 'redux';
import authReducer from './Store/authReducer';
import drawerBackDropReducer from './Store/drawerBackDropReducer';
import {Provider} from 'react-redux';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import {persistStore, persistReducer} from 'redux-persist';
import forgotPasswordReducer from './Store/forgotPasswordReducer';

const persistConfig ={
    key: 'root',
    storage
}

const rootReducer = combineReducers({
    auth: authReducer,
    drawerBackDrop: drawerBackDropReducer,
    forgotPass: forgotPasswordReducer
});

const persistedReducer = persistReducer(persistConfig,rootReducer);


let store = createStore(persistedReducer);

let persistor = persistStore(store);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <PersistGate loading={null} persistor={persistor}>
                <App/>
            </PersistGate>
       </BrowserRouter>
    </Provider>

);
ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
