import React from 'react';
import { formatString } from '../../lib/utility';
import Input from '../../сommon_components/Input/Input';
import s from './CustomCss.module.scss';

const CustomCss = ({ style, onKeyChange, onValueChange, keyInput, valueInput, onRowClick, onKeyDown, onValueDown }) => {
	return (
		<div className={s.styles}>
			{Object.keys(style).length > 0 && (
				<React.Fragment>
					<div className={s.styles__brace}>{`{`}</div>
					{Object.keys(style).map((key) => {
						return (
							<div className={s.styles__style} key={key} onClick={onRowClick}>
								<div className={s.styles__key}>{formatString.toThroughDash(key)}:</div>
								<div className={s.styles__value}>{style[key]};</div>
							</div>
						);
					})}
					{keyInput.visible && (
						<div className={s.styles__style} onClick={onRowClick}>
							{keyInput.input ? (
								<React.Fragment>
									<Input
										autoFocus
										className={s.styles__key_input}
										onChange={onKeyChange}
										size={keyInput.size}
										value={keyInput.value}
										onKeyDown={onKeyDown}
										onClick={(e) => e.stopPropagation()}
									/>
									<span className={s.styles__colon}>:</span>
								</React.Fragment>
							) : (
								<div
									className={
										s.styles__key + ' ' + (!keyInput.correct ? s.styles__key_incorrect : '')
									}>
									{formatString.toThroughDash(keyInput.value)}:
								</div>
							)}

							{valueInput.visible && (
								<Input
									autoFocus
									className={s.styles__key_input}
									onChange={onValueChange}
									size={valueInput.size}
									value={valueInput.value}
									onKeyDown={onValueDown}
									onClick={(e) => e.stopPropagation()}
								/>
							)}
						</div>
					)}
					<div className={s.styles__brace} onClick={onRowClick}>{`}`}</div>
				</React.Fragment>
			)}
			{!Object.keys(style).length && <div className={s.styles__empty}>{`{}`}</div>}
		</div>
	);
};

export default CustomCss;
