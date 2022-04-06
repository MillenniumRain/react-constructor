import React from 'react';
import s from './Button.module.scss';

// placeholder=''
// value={props.value}
// onChange={(e) => {}}
const Button = (props) => {
	const label = props.placeholder;
	const newProps = { ...props, placeholder: '' };
	const id = ['rc', label, newProps.value, props.key].join('');
	return <button {...props} className={[s.button, props.className].join(' ')}></button>;
};

export default Button;
