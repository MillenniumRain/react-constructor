import React, { useEffect, useRef } from 'react';
import ColorPalette from '../../сommon_components/ColorPalette/ColorPalette';
import ContSwitchingTags from '../SwitchingTags/ContSwitchingTags';
import s from './Constructor.module.scss';

const Constructor = (props) => {
	return (
		<div className={s.settings}>
			<header className={s.header}>
				<button className={s.header__button} onClick={props.onClickCreateBlock}>
					Создать блок
				</button>
				<button className={s.header__button} onClick={props.onClickCreateAfterBlock}>
					Создать после блока
				</button>
				<button className={s.header__button} onClick={props.onClickDeleteBlock}>
					Удалить блок
				</button>
			</header>
			<section className={s.settings__block}>
				<ContSwitchingTags name='width' />
				<ContSwitchingTags name='height' />
			</section>

			<section className={s.settings__block}>
				<ContSwitchingTags name='marginTop' />
				<ContSwitchingTags name='marginRight' />
				<ContSwitchingTags name='marginBottom' />
				<ContSwitchingTags name='marginLeft' />
			</section>
			<section className={s.settings__block}>
				<ContSwitchingTags name='paddingTop' />
				<ContSwitchingTags name='paddingRight' />
				<ContSwitchingTags name='paddingBottom' />
				<ContSwitchingTags name='paddingLeft' />
			</section>
			<section className={s.settings__block}>
				<div className={s.settings__line_block}>
					<span className={s.settings__line_block_name}>Background-color:</span>
					<ColorPalette name='backgroundColor' />
				</div>
				<div className={s.settings__line_block}>
					<span className={s.settings__line_block_name}>Color:</span>
					<ColorPalette name='color' />
				</div>
			</section>
		</div>
	);
};

export default Constructor;
