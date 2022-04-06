import { combineReducers } from 'redux';
import { mainSiteReducer } from './mainSiteReducer';
import { switchingTagsReducer } from './switchingTagsReducer';

export const rootReducer = combineReducers({
	switchingTagsReducer,
	mainSiteReducer,
});
