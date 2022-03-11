import React from 'react';
import s from './SiteStyles.module.scss';

const SiteStyles = (props) => {
	return (
		<div className={s.buttons_block}>
			<button onClick={props.onClickCreateBlock}>Создать блок</button>
			<button onClick={props.onClickCreateAfterBlock}>Создать после блока</button>
			<button onClick={props.onClickDeleteBlock}>Удалить блок</button>
		</div>
	);
};

export default SiteStyles;
