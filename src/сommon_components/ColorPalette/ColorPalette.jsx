import React, { useEffect, useRef, useState } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import Palette from '../Palette/Palette';
import s from './ColorPalette.module.scss';
import bgGradiend from './../../img/bgGradient.png';
import DragDrop from '../DragDrop/DragDrop';
import { useDispatch } from 'react-redux';
import { setGobalStyle, setStyleToBlock } from '../../reducers/mainSiteReducer';
const ColorPalette = (props) => {
	const dispatch = useDispatch();
	const [isVisible, setVisible] = useState(false);
	const [hue, setHue] = useState({ value: 0 });
	const [sv, setSV] = useState({ valueS: 100, valueV: 100 });
	const [alpha, setAlpha] = useState({ value: 0 });

	const onClickHandler = (e) => {
		setVisible(true);
	};
	const onClickOutside = () => {
		setVisible(false);
	};
	const onMouseDownAlphaHandler = (e, coords) => {
		const width = coords.parent.rect.width - coords.drag.rect.width;
		setAlpha({ value: Math.round((100 * coords.drag.x) / width) / 100 });
		dispatch(
			setGobalStyle({
				[props.name]: `rgba(${hsvConvetToRgb(hue.value, sv.valueS, sv.valueV).join(',')},${alpha.value})`,
			})
		);
		dispatch(setStyleToBlock());
	};
	const onMouseDownHueHandler = (e, coords) => {
		const height = coords.parent.rect.height - coords.drag.rect.height;
		setHue({ value: 360 - Math.round((360 * coords.drag.y) / height) });
		dispatch(
			setGobalStyle({
				[props.name]: `rgba(${hsvConvetToRgb(hue.value, sv.valueS, sv.valueV).join(',')},${alpha.value})`,
			})
		);
		dispatch(setStyleToBlock());
	};
	const onMouseDownSVHandler = (e, coords) => {
		const width = coords.parent.rect.width - coords.drag.rect.width;
		const height = coords.parent.rect.height - coords.drag.rect.height;

		setSV({
			valueS: Math.round((100 * coords.drag.x) / width),
			valueV: 100 - Math.round((100 * coords.drag.y) / height),
		});
		dispatch(
			setGobalStyle({
				[props.name]: `rgba(${hsvConvetToRgb(hue.value, sv.valueS, sv.valueV).join(',')},${alpha.value})`,
			})
		);
		dispatch(setStyleToBlock());
	};
	const convertRgbToHex = (R, G, B, A = 1) => {
		const hex = [R, G, B, A * 255].map((val) => ('0' + Math.round(val).toString(16)).slice(-2));

		return `#${hex.join('')}`;
	};
	const hsvConvetToRgb = (H, S, V) => {
		S /= 100;
		V /= 100;
		let lH = H === 360 ? 5 : Math.floor(H / 60);
		const f = H / 60 - lH;
		const p = V * (1 - S);
		const q = V * (1 - S * f);
		const t = V * (1 - (1 - f) * S);
		let R, G, B;
		switch (lH) {
			case 0:
				R = V;
				G = t;
				B = p;
				break;
			case 1:
				R = q;
				G = V;
				B = p;
				break;
			case 2:
				R = p;
				G = V;
				B = t;
				break;
			case 3:
				R = p;
				G = q;
				B = V;
				break;
			case 4:
				R = t;
				G = p;
				B = V;
				break;
			case 5:
				R = V;
				G = p;
				B = q;
				break;
		}
		return [parseInt(R * 255), parseInt(G * 255), parseInt(B * 255)];
	};

	const currentColor = `rgba(${hsvConvetToRgb(hue.value, sv.valueS, sv.valueV).join(',')},${alpha.value})`;

	return (
		<div className={s.palette}>
			<button disabled={isVisible} onClick={onClickHandler} className={s.palette__button}>
				<Palette color={currentColor} />
			</button>
			<Dropdown className={s.palette__dropdown} onClickOutside={onClickOutside} isVisible={isVisible}>
				<div className={s.palette__container}>
					{/* основной блок*/}
					<DragDrop
						onMouseMove={onMouseDownSVHandler}
						onMouseDown={onMouseDownSVHandler}
						className={s.palette__block}
						dragClassName={s.palette__picker}
						style={{ backgroundColor: `rgba(${hsvConvetToRgb(hue.value, 100, 100).join(',')})` }}>
						<img className={s.palette__bg} src={bgGradiend} alt='' />
					</DragDrop>
					{/* 360 цвет*/}
					<DragDrop
						onMouseMove={onMouseDownHueHandler}
						onMouseDown={onMouseDownHueHandler}
						className={s.palette__line}
						dragClassName={s.palette__picker_horizontal}></DragDrop>
					{/* выбранный цвет*/}
					<div className={s.palette__selected_color} style={{ backgroundColor: currentColor }}></div>
				</div>
				{/* альфа*/}
				<DragDrop
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
							value={`rgba(${hsvConvetToRgb(hue.value, sv.valueS, sv.valueV).join(',')},${alpha.value})`}
						/>
					</div>
					<div className={s.palette__input_group}>
						<span>HEX:</span>
						<input
							onChange={() => {}}
							className={s.palette__input}
							type='text'
							value={convertRgbToHex(...hsvConvetToRgb(hue.value, sv.valueS, sv.valueV), alpha.value)}
						/>
					</div>
				</div>
			</Dropdown>
		</div>
	);
};

export default ColorPalette;
