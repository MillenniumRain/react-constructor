import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { Provider } from 'react-redux';
import { reduxStore } from './reducers/reduxStore';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={reduxStore}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
