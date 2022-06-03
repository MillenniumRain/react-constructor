import React from 'react';
import s from './CustomCss.module.scss';
import CustomCssEditor from './CustomCssEditor/CustomCssEditor';
import CustomCssStyle from './CustomCssStyle/CustomCssStyle';

const CustomCss = ({
	style,
	editableStyle,
	onClickStyleToEdit,
	onClickStyleToCreate,
	onChangeCSS,
	onSaveCSS,
	isPropertyClicked,
	isCreate,
}) => {
	const flexRow =
		((style && !Object.keys(style).length) || !style) && !isCreate ? { display: 'flex', flexDirection: 'row' } : {};
	return (
		<div className={s.styles} onClick={onClickStyleToCreate} style={flexRow}>
			<div className={s.styles__brecket}>{`{`}</div>
			{style && Object.keys(style).length > 0 && (
				<React.Fragment>
					{Object.keys(style).map((value) => {
						if (editableStyle.property.name === value) {
							return (
								<CustomCssEditor
									isPropertyClicked={isPropertyClicked}
									property={editableStyle.property.value}
									value={editableStyle.value.value}
									key={value}
									onChangeCSS={onChangeCSS}
									onSaveCSS={onSaveCSS}
									onClick={(e) => {
										e.stopPropagation();
										e.preventDefault();
									}}
								/>
							);
						}
						return (
							<CustomCssStyle
								property={value}
								value={style[value]}
								key={value}
								onClickProperty={onClickStyleToEdit}
								onClickValue={onClickStyleToEdit}
							/>
						);
					})}
				</React.Fragment>
			)}
			{isCreate && (
				<React.Fragment>
					<CustomCssEditor
						isPropertyClicked={isPropertyClicked}
						property={editableStyle.property.value}
						value={editableStyle.value.value}
						onChangeCSS={onChangeCSS}
						onSaveCSS={onSaveCSS}
						onClick={(e) => {
							e.stopPropagation();
							e.preventDefault();
						}}
					/>
				</React.Fragment>
			)}
			<div className={s.styles__brecket}>{`}`}</div>
		</div>
	);
};

export default CustomCss;
