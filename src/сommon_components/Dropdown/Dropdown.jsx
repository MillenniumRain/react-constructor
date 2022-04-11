import React, { useEffect, useRef } from 'react';
import s from './Dropdown.module.scss';

const Dropdown = ({ onClickOutside, remove, children, className }) => {
	const ref = useRef();
	const handleClickOutside = (e) => {
		if (!ref?.current?.contains(e.target)) {
			onClickOutside && onClickOutside(e);
		}
	};
	useEffect(() => {
		const dropdown = ref?.current?.getBoundingClientRect();
		if (dropdown && dropdown.left + dropdown.width > document.documentElement.clientWidth) {
			ref.current.style.left =
				document.documentElement.clientWidth - (dropdown.left + dropdown.width + 17) + 'px';
		}

		remove && document.addEventListener('mousedown', handleClickOutside);
		return () => {
			remove && document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className={s.dropdown + ' ' + className} ref={ref}>
			{children}
		</div>
	);
};

export default Dropdown;
