import React, { createElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeBlock, setEditMode } from '../../reducers/mainSiteReducer';
import s from './MapSite.module.scss';
import MapSite from './MapSite';

const ContMapSite = (props) => {
	const structure = useSelector((state) => state.mainSiteReducer.structure);
	const dispatch = useDispatch();
	let prevent = false;
	let timeout;
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
		e.stopPropagation();
		clearTimeout(timeout);
		prevent = true;
		dispatch(activeBlock(val));
		dispatch(setEditMode(true));
	};

	const map = [];
	const mapping = (structure) => {
		if (!structure.length) return;

		structure.map((val, i) => {
			map.push(
				<div
					onDoubleClick={(e) => onDblClickHandler(e, val)}
					onClick={(e) => onClickHandler(e, val)}
					className={(val.crClassName || '') + ' ' + s.map__block}
					key={val.path}
					style={{ paddingLeft: val.path.split(':').length * 10 + 'px' }}>
					{val.path} &nbsp;<span className={s.map__block_name}>{val.type.toUpperCase()}</span>.
					<span className={s.map__block_class}>{val.className}</span>
				</div>
			);
			mapping(val.child);
		});
		return map;
	};
	return <MapSite>{mapping(structure)} </MapSite>;
};

export default ContMapSite;
