import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

/**
 * LoginForm component
 */
class LoginForm extends Component {
	constructor (props){
		super(props);

		this.onClose = this.onClose.bind(this);
	}

	/**
	 * onClose
	 */
	onClose() {
		this.props.reset(this);
		this.props.onClose(this);
	}

	render() {
		return (
			<div className='LoginForm'
					visibility={ '' + this.props.visibility }>
					<h3>Login Form</h3>
					<form onSubmit={ this.props.handleSubmit }>
						<Field component='input' name='user' type='email' placeholder='Email' />
						<Field component='input' name='pass' type='password' placeholder='Password' />
						<button type='submit' disabled={
							this.props.pristine ||
							this.props.submitting }>Login</button>
					</form>
					<a onClick={ this.onClose }>Cancel</a>
			</div>
		);
	}
}

export default reduxForm({ form: 'loginForm' })(LoginForm);