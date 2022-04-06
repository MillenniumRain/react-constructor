import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { Provider } from 'react-redux';
import { reduxStore } from './store/reducers/reduxStore';

ReactDOM.render(
	<Provider store={reduxStore}>
		<App />
	</Provider>,
	document.getElementById('root')
);
