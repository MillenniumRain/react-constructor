import React from 'react';
import s from './TextBlock.module.scss';

const TextBlock = (props) => {
	const value = props.value || '';
	return (
		<textarea value={value} onChange={props.onChange} className={s.textarea}>
			TextBlock
		</textarea>
	);
};

export default TextBlock;
