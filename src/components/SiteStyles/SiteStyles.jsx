import React from 'react';
import ColorPalette from '../../сommon_components/ColorPalette/ColorPalette';
import ContSwitchingTags from '../SwitchingTags/ContSwitchingTags';
import s from './SiteStyles.module.scss';

const SiteStyles = (props) => {
	return (
		<div className={s.buttons_block}>
			<button onClick={props.onClickCreateBlock}>Создать блок</button>
			<button onClick={props.onClickCreateAfterBlock}>Создать после блока</button>
			<button onClick={props.onClickDeleteBlock}>Удалить блок</button>
			<ContSwitchingTags name='width' />
			<ContSwitchingTags name='height' />
			<ColorPalette name='background' />
		</div>
	);
};

export default SiteStyles;
