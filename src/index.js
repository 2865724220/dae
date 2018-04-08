import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { HashRouter as Router } from 'react-router-dom';
import stores from './stores'
import './index.css';
import './App.css';
// import App from './App';
import App from './component/app';
import registerServiceWorker from './registerServiceWorker';
require('es6-promise').polyfill();

ReactDOM.render(
    <Router>
        <Provider {...stores}>
            <App/>
        </Provider>
    </Router>,
    document.getElementById('root')
);
registerServiceWorker();
