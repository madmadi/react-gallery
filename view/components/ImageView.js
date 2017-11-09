import React from 'react';
import { connect } from 'react-redux';
import { closeImageViewer } from '../../store/actions';

/**
 * ImageView component
 * Stateless functional image view component
 */
const ImageView = ({ dispatch, visibility, src, title, subtitle }) => {
	const close = () => {
		// Close image view action
		dispatch(closeImageViewer());
	};

	return (
		<div className='ImageView'
			visibility={ '' + visibility }
			onClick={ close }>
			<img src={ src } with='400' height='200' />
			<div className='details'>
				<p>{ title }</p>
				<small>{ subtitle }</small>
			</div>
		</div>
	);
};

// Connect to store and map state to props
export default connect(state => {
	return {
		visibility: state.imageView.visibility,
		src: state.imageView.src,
		title: state.imageView.title,
		subtitle: state.imageView.subtitle
	}
})(ImageView);