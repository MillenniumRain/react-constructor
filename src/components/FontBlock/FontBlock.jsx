import React from 'react';
import Input from '../../сommon_components/Input/Input';
import { Select } from '../../сommon_components/Select/Select';
import ColorPalette from '../ColorPalette/ColorPalette';
import s from './FontBlock.module.scss';

const FontBlock = ({ style, values, onChange }) => {
	return (
		<div className={s.input__container}>
			<div className={s.input__main_group}>
				<Input
					placeholder='Font-family'
					className={s.input}
					value={style['fontFamily']}
					onChange={(e) => onChange(e, 'fontFamily')}
				/>
				<Input
					type='text'
					placeholder='Font-size'
					className={s.input}
					value={style['fontSize']}
					onChange={(e) => onChange(e, 'fontSize')}
				/>
				<Select
					className={s.input__select}
					values={values['fontWeight']}
					onClickOption={(e, value) => onChange(e, 'fontWeight', value)}
					defaultValue={'Font-weight'}
					selectedValue={style['fontWeight']}
				/>
			</div>
			<div className={s.input__group}>
				<Select
					className={s.input__select}
					values={values['fontStyle']}
					onClickOption={(e, value) => onChange(e, 'fontStyle', value)}
					defaultValue={'Font-style'}
					selectedValue={style['fontStyle']}
				/>
				<Select
					className={s.input__select}
					values={values['textDecoration']}
					onClickOption={(e, value) => onChange(e, 'textDecoration', value)}
					defaultValue={'Text-decoration'}
					selectedValue={style['textDecoration']}
				/>
				<Select
					className={s.input__select}
					values={values['textTransform']}
					onClickOption={(e, value) => onChange(e, 'textTransform', value)}
					defaultValue={'Text-transform'}
					selectedValue={style['textTransform']}
				/>
				<Select
					className={s.input__select}
					values={values['textAlign']}
					onClickOption={(e, value) => onChange(e, 'textAlign', value)}
					defaultValue={'Text-align'}
					selectedValue={style['textAlign']}
				/>

				<Input
					type='text'
					placeholder='Line-height'
					className={s.input}
					value={style['lineHeight']}
					onChange={(e) => onChange(e, 'lineHeight')}
				/>
			</div>
			<div className={s.input__example_container}>
				<div className={s.input__example}>
					<span className={s.input__name}>Color:</span>
					<ColorPalette className={s.input__color} name='color' />
					<Input
						type='text'
						placeholder='Color'
						value={style['color']}
						onChange={(e) => onChange(e, 'color')}
					/>
				</div>
				<div className={[s.input__example, s.input__text].join(' ')} style={style}>
					Abc... Абв...
				</div>
			</div>
		</div>
	);
};

export default FontBlock;
