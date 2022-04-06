import React, { useState } from 'react';
import Button from '../../сommon_components/Button/Button';
import Input from '../../сommon_components/Input/Input';
import Popup from '../../сommon_components/Popup/Popup';
import s from './HeaderMenu.module.scss';

const HeaderMenu = ({
	data,
	isVisible,
	onClickSave,
	onClickSaveAs,
	onClosePopup,
	loadSaved,
	deleteSaved,
	isVisibleCreate,
	onClickSaveAsPopup,
	onClickSaveName,
	onChangeInputSaveName,
}) => {
	const [saveDisabled, setSaveDisabled] = useState(false);
	const onClickSaveHandler = () => {
		onClickSave && onClickSave();
		setSaveDisabled(true);
		setTimeout(() => {
			setSaveDisabled(false);
		}, 1100);
	};
	return (
		<div className={s.header_menu}>
			<div className={s.header_menu__group}>
				<Button disabled={saveDisabled} className={s.header_menu__button} onClick={onClickSaveHandler}>
					Сохранить
				</Button>
				<Button className={s.header_menu__button} onClick={onClickSaveAs}>
					Сохранить как / Загрузить
				</Button>
			</div>
			{isVisible && (
				<Popup onClose={onClosePopup}>
					<div className={s.save_block}>
						<div className={s.save_block__buttons}>
							<Button onClick={onClickSaveAsPopup}>Сохранить как</Button>
						</div>
						<div className={s.save_block__list}>
							{isVisibleCreate && (
								<form className={s.save_block__item_input} onSubmit={onClickSaveName}>
									<Input
										autoFocus
										className={s.save_block__input}
										onChange={onChangeInputSaveName}
										placeholder='Название сохранения'
									/>
									<Button type='submit' className={s.save_block__button_save}>
										<span>╳</span>
									</Button>
								</form>
							)}
							{data &&
								data.map((val) => (
									<div className={s.save_block__item} key={val.date}>
										<div className={s.save_block__name}>{val.name}</div>
										<div className={s.save_block__date}>{val.date}</div>
										<div className={s.save_block__controls}>
											<Button
												className={s.save_block__button}
												onClick={(e) => loadSaved(e, val.name, val.date)}>
												Загрузить
											</Button>
											<Button
												className={s.save_block__button}
												onClick={(e) => deleteSaved(e, val.name, val.date)}>
												╳
											</Button>
										</div>
									</div>
								))}
						</div>
					</div>
				</Popup>
			)}
		</div>
	);
};

export default HeaderMenu;
