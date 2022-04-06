import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGlobalText, setTextToBlock } from '../../store/actions/actions';
import TextBlock from './TextBlock';

const ContTextBlock = (props) => {
	const activeBlockText = useSelector((state) => state.mainSiteReducer.lastActive?.text);
	const dispatch = useDispatch();
	const [text, setCurrentText] = useState(activeBlockText);
	useEffect(() => {
		setCurrentText(activeBlockText);
	}, [activeBlockText]);
	const onChangeHandler = (e) => {
		const value = e.target.value;
		setCurrentText(value);
		dispatch(setGlobalText(value));
		dispatch(setTextToBlock());
	};
	return <TextBlock value={text} onChange={onChangeHandler} />;
};

export default ContTextBlock;
