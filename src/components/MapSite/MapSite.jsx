import React from 'react';
import s from './MapSite.module.scss';

const MapSite = (props) => {
	return <div className={s.map}>{props.children}</div>;
};

export default MapSite;
