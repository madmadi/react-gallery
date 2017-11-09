import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import TYPES from './types';

// Initial states
const imageViewInitialState = {
	visibility: false,
	src: '',
	title: '',
	subtitle: '',
};
const userInitialState = {
	name: '',
	authorized: false
}

/**
 * user
 * @param state
 * @param action
 * User state
 */
function user(state = userInitialState, action) {
	switch (action.type) {
		case TYPES.USER_LOGGED_IN:
			return {
				...state,
				name: action.name,
				authorized: true
			};
		case TYPES.USER_LOGGED_OUT:
			return {
				...state,
				name: '',
				authorized: false
			};
		default:
			return state;
	}
}

// 
/**
 * imageView
 * @param state
 * @param action
 * ImageView component state
 */
function imageView(state = imageViewInitialState, action) {
	switch (action.type) {
		case TYPES.DISPLAY_IMAGE:
			return {
				...state,
				...action.image,
				visibility: true
			};
		case TYPES.CLOSE_IMAGE_VIEWER:
			return imageViewInitialState;
		default:
			return state;
	}
}

export default combineReducers({ user, imageView, form });