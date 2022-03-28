import React from 'react';
import { useDispatch } from 'react-redux';
import { createAfterBlock, createBlock, deleteBlock } from '../../reducers/mainSiteReducer';
import Constructor from './Constructor';
const ContConstructor = (props) => {
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
		<Constructor
			onClickCreateAfterBlock={onClickCreateAfterBlock}
			onClickDeleteBlock={onClickDeleteBlock}
			onClickCreateBlock={onClickCreateBlock}
		/>
	);
};

export default ContConstructor;
