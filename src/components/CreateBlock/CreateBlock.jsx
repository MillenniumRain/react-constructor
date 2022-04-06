import React from 'react';
import Button from '../../сommon_components/Button/Button';
import { Select } from '../../сommon_components/Select/Select';
import s from './CreateBlock.module.scss';

const CreateBlock = ({
	values,
	tag,
	onClickSelect,
	onClickCreateBlock,
	onClickCreateAfterBlock,
	onClickEditBlock,
	onClickDeleteBlock,
}) => {
	return (
		<div className={s.create_block}>
			<Select
				values={values}
				className={s.create_block__select}
				defaultValue={tag}
				onClickOption={onClickSelect}
			/>
			<Button onClick={onClickCreateBlock}>Создать</Button>
			<Button onClick={onClickCreateAfterBlock}>Создать после</Button>
			<Button onClick={onClickEditBlock}>Изменить</Button>
			<Button onClick={onClickDeleteBlock}>Удалить</Button>
		</div>
	);
};

export default CreateBlock;
