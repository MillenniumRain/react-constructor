import React, { useState } from 'react';
import s from './HSV.module.scss';
import bgGradiend from '../../../img/bgGradient.png';
import { useDispatch } from 'react-redux';
import Dropdown from '../../../сommon_components/Dropdown/Dropdown';
import { setGobalStyle, setStyleToBlock } from '../../../store/actions/actions';
import DragDrop from '../../../сommon_components/DragDrop/DragDrop';
import { colorConvert } from '../../../lib/colorConvert';

const HSV = ({ isVisible, setVisible, name, color }) => {
	const dispatch = useDispatch();
	const [hueSize, setHueSize] = useState(null);
	const [svSize, setSVSize] = useState(null);
	const [alphaSize, setAlphaSize] = useState(null);

	const hsvColor = colorConvert.rgbToHsv(...color);
	const [hue, setHue] = useState(hsvColor.h);
	const [sv, setSV] = useState({ saturation: hsvColor.s, value: hsvColor.v });
	const [alpha, setAlpha] = useState(color[3] || 1);

	const onClickOutside = () => {
		setVisible(false);
	};

	const onMouseDownAlphaHandler = (e, coords) => {
		const width = coords.parent.rect.width - coords.drag.rect.width;
		const alpha = Math.round((100 * coords.drag.x) / width) / 100;
		setAlpha(alpha);
		dispatch(
			setGobalStyle({
				[name]: `rgba(${colorConvert.hsvToRgb(hue, sv.saturation, sv.value).join(',')},${alpha})`,
			})
		);
		dispatch(setStyleToBlock());
	};
	const onMouseDownHueHandler = (e, coords) => {
		const height = coords.parent.rect.height - coords.drag.rect.height;
		const hue = 360 - Math.round((360 * coords.drag.y) / height);
		setHue(hue);

		dispatch(
			setGobalStyle({
				[name]: `rgba(${colorConvert.hsvToRgb(hue, sv.saturation, sv.value).join(',')},${alpha})`,
			})
		);
		dispatch(setStyleToBlock());
	};
	const onMouseDownSVHandler = (e, coords) => {
		const width = coords.parent.rect.width - coords.drag.rect.width;
		const height = coords.parent.rect.height - coords.drag.rect.height;
		const saturation = Math.round((100 * coords.drag.x) / width);
		const value = 100 - Math.round((100 * coords.drag.y) / height);

		setSV({
			saturation,
			value,
		});
		dispatch(
			setGobalStyle({
				[name]: `rgba(${colorConvert.hsvToRgb(hue, saturation, value).join(',')},${alpha})`,
			})
		);
		dispatch(setStyleToBlock());
	};

	const firstPosition = (value, scale, max, direction, reverse = false) => {
		if (!scale) return 0;
		if (direction === 'y') {
			const length = scale.parent.height - scale.drag.height;
			if (reverse) {
				return (length * value) / max;
			}
			return length - (length * value) / max;
		}
		if (direction === 'x') {
			const length = scale.parent.width - scale.drag.width;
			if (reverse) {
				return length - (length * value) / max;
			}
			return (length * value) / max;
		}
	};
	const currentColor = `rgba(${colorConvert.hsvToRgb(hue, sv.saturation, sv.value).join(',')},${alpha})`;
	return (
		<Dropdown remove={true} className={s.palette__dropdown} onClickOutside={onClickOutside} isVisible={isVisible}>
			<div className={s.palette__container}>
				{/* SV */}
				<DragDrop
					positionX={firstPosition(sv.saturation, svSize, 100, 'x')}
					positionY={firstPosition(sv.value, svSize, 100, 'y')}
					setSize={setSVSize}
					onMouseMove={onMouseDownSVHandler}
					onMouseDown={onMouseDownSVHandler}
					className={s.palette__block}
					dragClassName={s.palette__picker}
					style={{
						backgroundColor: `rgb(${colorConvert.hsvToRgb(hue, 100, 100).join(',')})`,
					}}>
					<img className={s.palette__bg} src={bgGradiend} alt='' />
				</DragDrop>
				{/* HUE 360*/}
				<DragDrop
					positionY={firstPosition(hue, hueSize, 360, 'y')}
					setSize={setHueSize}
					onMouseMove={onMouseDownHueHandler}
					onMouseDown={onMouseDownHueHandler}
					className={s.palette__line}
					dragClassName={s.palette__picker_horizontal}></DragDrop>
				{/* выбранный цвет*/}
				<div className={s.palette__selected_color} style={{ backgroundColor: currentColor }}></div>
			</div>
			{/* Alpha */}
			<DragDrop
				positionX={firstPosition(alpha, alphaSize, 1, 'x')}
				setSize={setAlphaSize}
				onMouseMove={onMouseDownAlphaHandler}
				onMouseDown={onMouseDownAlphaHandler}
				className={s.palette__alpha_color}
				dragClassName={s.palette__picker_vertical}></DragDrop>

			<div className={s.palette__input_container}>
				<div className={s.palette__input_group}>
					<span>RGB:</span>
					<input
						className={s.palette__input}
						type='text'
						onChange={() => {}}
						value={`rgba(${colorConvert.hsvToRgb(hue, sv.saturation, sv.value).join(',')},${alpha})`}
					/>
				</div>
				<div className={s.palette__input_group}>
					<span>HEX:</span>
					<input
						onChange={() => {}}
						className={s.palette__input}
						type='text'
						value={colorConvert.rgbToHex(...colorConvert.hsvToRgb(hue, sv.saturation, sv.value), alpha)}
					/>
				</div>
			</div>
		</Dropdown>
	);
};

export default HSV;
