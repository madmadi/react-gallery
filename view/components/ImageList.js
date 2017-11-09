import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImageView from './ImageView';
import { displayImage } from '../../store/actions'

/**
 * ListItem sub component
 */
class ListItem extends Component {
	constructor (props){
		super(props);

		this.showImage = this.showImage.bind(this);
	}

	/**
	 * showImage
	 */
	showImage() {
		// Display image action
		this.props.dispatch(displayImage(this.props.image));
	}

	render() {
		return (
			<li className='ListItem' onClick={ this.showImage }>
				<img src={ this.props.image.src } width='52' height='52' />
				<div className='info'>
					<p className='title'>{ this.props.image.title }</p>
					<p className='subtitle'>{ this.props.image.subtitle }</p>
					<a href='#' visibility={ '' + this.props.visibility }>Comments</a>
				</div>
			</li>
		);
	}
}

// Connect list item to store
ListItem = connect(state => {
	return { visibility: state.user.authorized }
})(ListItem);

/**
 * ImageList component
 */
class ImageList extends Component {
	render() {
		return (
			<div className='ImageList'>
				<ul>
					{ this.props.list.map(image =>
						<ListItem key={ image.id } image={ image } />
					) }
				</ul>

				<ImageView />
			</div>
		);
	}
}

export default ImageList;