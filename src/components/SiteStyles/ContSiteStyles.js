import React from 'react';
import { useDispatch } from 'react-redux';
import { createAfterBlock, createBlock, deleteBlock } from '../../reducers/mainSiteReducer';
import SiteStyles from './SiteStyles';
const ContSiteStyles = (props) => {
	const dispatch = useDispatch();
	const onClickCreateBlock = (e) => {
		dispatch(createBlock());
	};
	const onClickCreateAfterBlock = (e) => {
		dispatch(createAfterBlock());
	};
	const onClickDeleteBlock = (e) => {
		dispatch(deleteBlock());
	};

	return (
		<SiteStyles
			onClickCreateAfterBlock={onClickCreateAfterBlock}
			onClickDeleteBlock={onClickDeleteBlock}
			onClickCreateBlock={onClickCreateBlock}
		/>
	);
};

export default ContSiteStyles;
