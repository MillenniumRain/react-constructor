import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	createAfterBlock,
	createBlock,
	deleteBlock,
	setStyleToBlock,
	setTextToBlock,
} from '../../store/actions/actions';
import CreateBlock from './CreateBlock';

const ContCreateBlock = (props) => {
	const allTags = [
		'div',
		'article',
		'section',
		'main',
		'nav',
		'aside',
		'header',
		'footer',
		'a',
		'h1',
		'h2',
		'h3',
		'h4',
		'h5',
		'h6',
	];
	const dispatch = useDispatch();
	const [tag, setTag] = useState('div');
	const onClickCreateBlock = (e) => {
		dispatch(createBlock(tag));
	};
	const onClickCreateAfterBlock = (e) => {
		dispatch(createAfterBlock(tag));
	};
	const onClickDeleteBlock = (e) => {
		dispatch(deleteBlock());
	};
	const onClickSelect = (e, val) => {
		setTag(val);
	};
	const onClickEditBlock = () => {
		dispatch(setStyleToBlock(true));
		dispatch(setTextToBlock(true));
	};
	return (
		<CreateBlock
			tag={tag}
			onClickEditBlock={onClickEditBlock}
			onClickCreateAfterBlock={onClickCreateAfterBlock}
			onClickDeleteBlock={onClickDeleteBlock}
			onClickCreateBlock={onClickCreateBlock}
			onClickSelect={onClickSelect}
			values={allTags}
		/>
	);
};

export default ContCreateBlock;
