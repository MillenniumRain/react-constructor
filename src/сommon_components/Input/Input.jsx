import React from 'react';
import s from './Input.module.scss';

const Input = React.forwardRef(({ placeholder, value, className, onChange, key, style, ...props }, ref) => {
	const label = placeholder;
	const newProps = { ...props, placeholder: '' };
	const id = ['rc', label, newProps.value, key].join('');
	return (
		<div className={[s.input].join(' ')}>
			<input
				ref={ref}
				{...newProps}
				type='text'
				id={id}
				className={[s.input__input, className].join(' ')}
				value={value}
				onChange={onChange}
			/>
			<label className={s.input__label} htmlFor={id}>
				{label}
			</label>
		</div>
	);
});

export default Input;
