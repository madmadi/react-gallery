import TYPES from './types';

/**
 * displayImage
 * @param image
 */
export function displayImage(image) {
	return { type: TYPES.DISPLAY_IMAGE, image }
}

/**
 * closeImageViewer
 */
export function closeImageViewer() {
	return { type: TYPES.CLOSE_IMAGE_VIEWER }
}

/**
 * userLoggedIn
 * @param name
 */
export function userLoggedIn(name) {
	return { type: TYPES.USER_LOGGED_IN, name }
}

/**
 * userLoggedOut
 */
export function userLoggedOut() {
	return { type: TYPES.USER_LOGGED_OUT }
}