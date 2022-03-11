import React, { createElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeBlock } from '../../reducers/mainSiteReducer';
import Site from './Site';

const ContSite = (props) => {
	let structure = useSelector((state) => state.mainSiteReducer);
	let dispatch = useDispatch();

	const onClickHandler = (e, val) => {
		console.log(val);
		e.stopPropagation();
		dispatch(activeBlock(val));
	};
	const recursionMap = (array) => {
		if (!array.length) return;
		return array.map((val, i) => {
			return createElement(
				val.type,
				{
					key: val.path,
					style: val?.style || {},
					className: val?.className || '',
					onClick: (e) => onClickHandler(e, val),
				},
				recursionMap(val.child)
			);
		});
	};
	return <Site>{recursionMap(structure.structure)}</Site>;
};

export default ContSite;
