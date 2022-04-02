import React from 'react';
import s from './Input.module.scss';

// placeholder=''
// value={props.value}
// onChange={(e) => {}}
const Input = (props) => {
	const label = props.placeholder;
	const newProps = { ...props, placeholder: '' };
	const id = ['rc', label, newProps.value, props.key].join('');
	return (
		<div className={[s.input, props.className].join(' ')}>
			<input
				{...newProps}
				type='text'
				id={id}
				className={s.input__input}
				value={props.value}
				onChange={props.onChange}
			/>
			<label className={s.input__label} htmlFor={id}>
				{label}
			</label>
		</div>
	);
};

export default Input;
