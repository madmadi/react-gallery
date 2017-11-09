import fs from 'fs';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import galleryApp from './store/reducers';
import App from './view/components/App';

const app = Express();
const port = 3000;

// Serve static files
app.use('/public', Express.static('public'));

// This is fired every time the server side receives a request
app.use((req, res) => {
	// Create a new Redux store instance
	const store = createStore(galleryApp);

	// Render the component to a string
	const html = renderToString(
		<Provider store={store}>
			<App />
		</Provider>
	);

	// Grab the initial state from our Redux store
	const preloadedState = store.getState();

	// Send the rendered page back to the client
	res.send(renderFullPage(html, preloadedState));
});

/**
 * renderFullPage
 * @param html
 * @param state
 * Inject components and state to the template
 */
function renderFullPage(html, state) {
	return fs
	.readFileSync('./view/template.html',{ encoding: 'utf8' })
	.replace(/%[A-Z_]+%/gi, match => {
		switch (match) {
			case '%HTML%': return html;
			case '%PRELOADED_STATE%': return JSON.stringify(state);
			default: return '';
		}
	});
}

// Start server to listening
app.listen(port, () => {
	console.log('Server is running on 127.0.0.1:' + port)
});