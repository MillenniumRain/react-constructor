import React from 'react';
import Input from '../../сommon_components/Input/Input';
import { Select } from '../../сommon_components/Select/Select';
import ColorPalette from '../ColorPalette/ColorPalette';
import s from './FontBlock.module.scss';

const FontBlock = (props) => {
	return (
		<div className={s.input__container}>
			<div className={s.input__main_group}>
				<Input
					placeholder='Font-family'
					className={s.input}
					value={props.style['fontFamily']}
					onChange={(e) => props.onChange(e, 'fontFamily')}
				/>
				<Input
					type='text'
					placeholder='Font-size'
					className={s.input}
					value={props.style['fontSize']}
					onChange={(e) => props.onChange(e, 'fontSize')}
				/>
				<Select
					className={s.input__select}
					values={props.values['fontWeight']}
					onClickOption={(e, value) => props.onChange(e, 'fontWeight', value)}
					defaultValue={'Font-weight'}
				/>
			</div>
			<div className={s.input__group}>
				<Select
					className={s.input__select}
					values={props.values['fontStyle']}
					onClickOption={(e, value) => props.onChange(e, 'fontStyle', value)}
					defaultValue={'Font-style'}
				/>
				<Select
					className={s.input__select}
					values={props.values['textDecoration']}
					onClickOption={(e, value) => props.onChange(e, 'textDecoration', value)}
					defaultValue={'Text-decoration'}
				/>
				<Select
					className={s.input__select}
					values={props.values['textTransform']}
					onClickOption={(e, value) => props.onChange(e, 'textTransform', value)}
					defaultValue={'Text-transform'}
				/>
				<Select
					className={s.input__select}
					values={props.values['textAlign']}
					onClickOption={(e, value) => props.onChange(e, 'textAlign', value)}
					defaultValue={'Text-align'}
				/>

				<Input
					type='text'
					placeholder='Line-height'
					className={s.input}
					value={props.style['lineHeight']}
					onChange={(e) => props.onChange(e, 'lineHeight')}
				/>

				{
					// <Input
					// 	type='text'
					// 	placeholder='Font-variant'
					// 	value={props.style['fontVariant']}
					// 	onChange={(e) => props.onChange(e, 'fontVariant')}
					// />
				}
			</div>
			<div className={s.input__example_container}>
				<div className={s.input__example}>
					<span className={s.input__name}>Color:</span>
					<ColorPalette className={s.input__color} name='color' />
					<Input
						type='text'
						placeholder='Color'
						value={props.style['color']}
						onChange={(e) => props.onChange(e, 'color')}
					/>
				</div>
				<div className={[s.input__example, s.input__text].join(' ')} style={props.style}>
					Abc... Абв...
				</div>
			</div>
		</div>
	);
};

export default FontBlock;
