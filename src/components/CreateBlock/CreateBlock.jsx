import React from 'react';
import { Select } from '../../сommon_components/Select/Select';
import s from './CreateBlock.module.scss';

const CreateBlock = (props) => {
	return (
		<div className={s.create_block}>
			<Select
				values={props.values}
				className={s.create_block__select}
				defaultValue={props.tag}
				onClickOption={props.onClickSelect}
			/>
			<button className={s.create_block__button} onClick={props.onClickCreateBlock}>
				Создать блок
			</button>
			<button className={s.create_block__button} onClick={props.onClickCreateAfterBlock}>
				Создать после блока
			</button>
			<button className={s.create_block__button} onClick={props.onClickDeleteBlock}>
				Удалить блок
			</button>
		</div>
	);
};

export default CreateBlock;
