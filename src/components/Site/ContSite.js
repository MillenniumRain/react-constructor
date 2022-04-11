import React, { createElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeBlock, setEditMode } from '../../store/actions/actions';
import Site from './Site';

const ContSite = (props) => {
	let structure = useSelector((state) => state.mainSiteReducer.structure);
	let dispatch = useDispatch();
	let timeout;
	let prevent = false;
	const onClickHandler = (e, val) => {
		prevent = false;
		e.stopPropagation();
		timeout = setTimeout(() => {
			if (!prevent) {
				dispatch(activeBlock(val));
				dispatch(setEditMode(false));
			}
		}, 200);
	};

	const onDblClickHandler = (e, val) => {
		console.log(val);
		e.preventDefault();
		e.stopPropagation();
		clearTimeout(timeout);
		prevent = true;
		dispatch(activeBlock(val));
		dispatch(setEditMode(true));
	};
	const recursionMap = (array) => {
		if (!array.length) return;
		return array.map((val, i) => {
			return createElement(
				val.type,
				{
					key: val.path,
					style: val?.style || {},
					className: [val?.className, val?.crClassName].join(' ') || '',
					onClick: (e) => onClickHandler(e, val),
					onDoubleClick: (e) => onDblClickHandler(e, val),
				},
				recursionMap(val.child),
				val.text
			);
		});
	};
	return <Site>{recursionMap(structure)}</Site>;
};

export default ContSite;
