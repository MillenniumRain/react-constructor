import { combineReducers } from 'redux';
import { switchingTagsReducer } from './switchingTagsReducer';

export const rootReducer = combineReducers({
	switchingTagsReducer,
});
