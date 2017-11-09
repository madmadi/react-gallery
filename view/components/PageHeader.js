import React, { Component } from 'react';

/**
 * PageHeader component
 */
class PageHeader extends Component {
	render() {
		return (
			<div className='PageHeader'>
				<div className='buttons'>
					{ this.props.buttons.map(btn =>
						<a key={ btn.title }
							 onClick={ this.props.onButtonClick.bind(this, btn.tag) }>{ btn.title }</a>
					) }
				</div>
				<p className='title'>{ this.props.title }</p>
			</div>
		);
	}
}

export default PageHeader;