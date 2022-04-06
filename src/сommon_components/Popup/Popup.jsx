import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import s from './Popup.module.scss';

const Popup = (props) => {
	return ReactDOM.createPortal(
		<div className={s.popup}>
			<div className={s.popup__background} onClick={props.onClose}></div>
			<div className={s.popup__content}>{props.children}</div>
		</div>,
		document.getElementById('popup')
	);
};

export default Popup;
