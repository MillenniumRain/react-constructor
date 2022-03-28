import React, { useEffect, useRef } from 'react';
import s from './Dropdown.module.scss';

const Dropdown = (props) => {
	const ref = useRef();
	const handleClickOutside = (e) => {
		if (!ref?.current?.contains(e.target)) {
			props.onClickOutside && props.onClickOutside(e);
		}
	};
	useEffect(() => {
		const dropdown = ref.current.getBoundingClientRect();
		if (dropdown.left + dropdown.width > document.documentElement.clientWidth) {
			ref.current.style.left =
				document.documentElement.clientWidth - (dropdown.left + dropdown.width + 17) + 'px';
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		props.isVisible && (
			<div className={s.dropdown + ' ' + props.className} ref={ref}>
				{props.children}
			</div>
		)
	);
};

export default Dropdown;
