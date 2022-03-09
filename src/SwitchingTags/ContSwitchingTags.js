import React from 'react';
import { useSelector } from 'react-redux';
import SwitchingTags from './SwitchingTags';

const ContSwitchingTags = (props) => {
	const text = useSelector((state) => state.switchingTagsReducer.text);
	return <SwitchingTags text={text} />;
};

export default ContSwitchingTags;
