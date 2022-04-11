import React, { useEffect, useRef } from 'react';
import ColorPalette from '../ColorPalette/ColorPalette';
import ContCreateBlock from '../CreateBlock/ContCreateBlock';
import ContDisplayBlock from '../DisplayBlock/ContDisplayBlock';
import ContFontBlock from '../FontBlock/ContFontBlock';
import ContHeaderMenu from '../HeaderMenu/ContHeaderMenu';
import ContMapSite from '../MapSite/ContMapSite';
import ContSwitchingTags from '../SwitchingTags/ContSwitchingTags';
import ContTextBlock from '../TextBlock/ContTextBlock';
import s from './Constructor.module.scss';

const Constructor = (props) => {
	return (
		<div className={s.container}>
			<ContHeaderMenu />
			<div className={s.settings}>
				<ContCreateBlock />

				<section className={s.settings__block}>
					<ContSwitchingTags name='width' />
					<ContSwitchingTags name='height' />
				</section>

				<section className={s.settings__block}>
					<ContSwitchingTags name='margin' />
					<ContSwitchingTags name='padding' />
				</section>

				<section className={s.settings__block}>
					<ContDisplayBlock />
				</section>

				<section className={s.settings__block}>
					<div className={s.settings__line_block}>
						<span className={s.settings__line_block_name}>Background-color:</span>
						<ColorPalette name='backgroundColor' />
					</div>
				</section>

				<section className={s.settings__block}>
					<ContMapSite />
				</section>

				<section className={s.settings__block}>
					<ContFontBlock />
				</section>

				<section className={s.settings__block}>
					<ContTextBlock />
				</section>

				<section className={s.settings__block}>
					<ContSwitchingTags name='minWidth' />
					<ContSwitchingTags name='maxWidth' />
					<ContSwitchingTags name='minHeight' />
					<ContSwitchingTags name='maxHeight' />
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
			</div>
		</div>
	);
};

export default Constructor;
