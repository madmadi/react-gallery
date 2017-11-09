import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageHeader from './PageHeader';
import ImageList from './ImageList';
import LoginForm from './LoginForm';
import { userLoggedIn, userLoggedOut } from '../../store/actions'

// Sample data
import { images } from '../../dataSample';

/**
 * App
 * Main app component
 */
class App extends Component {
	constructor() {
		super();

		// Initial local state
		this.state = {
			loginFormVisibility: false
		}

		// Bind functions
		this.closeLoginForm = this.closeLoginForm.bind(this);
		this.openLoginForm = this.openLoginForm.bind(this);
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
	}

	/**
	 * closeLoginForm
	 * Close the login form
	 */
	closeLoginForm() {
		this.setState({ loginFormVisibility: false });
	}

	/**
	 * openLoginForm
	 * Make login form visible
	 */
	openLoginForm() {
		this.setState({ loginFormVisibility: true });
	}

	/**
	 * headerActionsHandler
	 * @param tag, specifies which button clicked
	 * Fires at Header buttons onClick 
	 */
	headerActionsHandler(tag) {
		switch(tag) {
			case 'login':
				this.openLoginForm();
				break;
			case 'logout':
				this.logout();
				break;
		}
	}

	/**
	 * login
	 * @param values
	 * Login the user
	 */
	login(values = {}) {
		// Send GET request to the api
		const self = this;
		const { user, pass } = values;

		const auth = 'Basic ' + btoa(user + ':' + pass);

		// Simple API call
		// I've used `https://httpbin.org` instead of postman echo
		fetch(`https://httpbin.org/basic-auth/${ user }/${ pass }`, {
			method: 'GET',
			headers: {
				"Authorization": auth,
				"Content-Type": 'application/json'
			}
		})
		.then(response => response.json())
		.then(result => {
			console.log(result, result.response, result.responseText, result.body);
			if (result.authenticated) {
				alert('Logged in successfully.');
				self.props.dispatch(userLoggedIn(result.user));
			} else {
				alert('Invalid username or password.');
				self.props.dispatch(userLoggedOut());
			}
		});

		this.closeLoginForm();
	}

	/**
	 * logout
	 * Logout the user
	 */
	logout() {
		if(confirm('Are you sure you want to logout?'))
			this.props.dispatch(userLoggedOut());
	}

	render() {
		return (
			<div className='App'>
				<PageHeader title='React Gallery'
					buttons={ this.props.headerButtons }
					onButtonClick={ this.headerActionsHandler.bind(this) } />
				<ImageList list={ images }/>
				<LoginForm visibility={ this.state.loginFormVisibility }
					onSubmit={ this.login }
					onClose={ this.closeLoginForm } />
			</div>
		);
	}
}

// export default App
export default connect(state => {
	return {
		authenticated: state.user.authorized,
		username: state.user.authorized,
		headerButtons: state.user.authorized ?
			[{ title: state.user.name, tag: 'logout' }] :
			[{ title: 'Login', tag: 'login' }]
	}
})(App);