import React from 'react';
import Button from '../../сommon_components/Button/Button';
import { Select } from '../../сommon_components/Select/Select';
import s from './DisplayBlock.module.scss';

const DisplayBlock = ({
	displaySelect,
	justifyContentSelect,
	alignItemsSelect,
	alignContentSelect,
	flexDirectionSelect,
	flexWrapSelect,
	onClickDisplay,
	onDisplayDeleteHandler,
	onDeleteHandler,
	setStyleHandler,
	onClickBtnHandler,
	onClickSelectFlex,
	currentStyles,
}) => {
	const flexPointClass = (justifyContent, alignItems) => {
		if (justifyContent === currentStyles?.justifyContent && alignItems === currentStyles?.alignItems) {
			return [s.display__flex_point, s.display__flex_point_active].join(' ');
		}

		return s.display__flex_point;
	};
	const buttonClass = (name) => {
		if (currentStyles.display === name) return [s.display__button, s.display__button_active].join(' ');
		return s.display__button;
	};

	return (
		<div className={s.display}>
			<div className={s.display__block}>
				<Select
					className={s.display__select}
					onClickOption={(e, value) => onClickDisplay(e, value)}
					onDelete={(e) => onDisplayDeleteHandler(e)}
					defaultValue='Display'
					values={displaySelect}
					selectedValue={currentStyles.display}
				/>
				<Button onClick={(e) => onClickBtnHandler(e, 'block')} className={buttonClass('block')}>
					block
				</Button>
				<Button onClick={(e) => onClickBtnHandler(e, 'flex')} className={buttonClass('flex')}>
					flex
				</Button>
				<Button onClick={(e) => onClickBtnHandler(e, 'none')} className={buttonClass('none')}>
					none
				</Button>
			</div>
			{currentStyles.display === 'flex' && (
				<div className={s.display__flex_box}>
					<div className={s.display__flex_preview}>
						<div className={s.display__flex_block}>
							<div className={s.display__flex_row}>
								<div
									className={flexPointClass('flex-start', 'flex-start')}
									onClick={(e) => onClickSelectFlex(e, 'flex-start', 'flex-start')}></div>
								<div
									className={flexPointClass('center', 'flex-start')}
									onClick={(e) => onClickSelectFlex(e, 'center', 'flex-start')}></div>
								<div
									className={flexPointClass('flex-end', 'flex-start')}
									onClick={(e) => onClickSelectFlex(e, 'flex-end', 'flex-start')}></div>
							</div>
							<div className={s.display__flex_row}>
								<div
									className={flexPointClass('flex-start', 'center')}
									onClick={(e) => onClickSelectFlex(e, 'flex-start', 'center')}></div>
								<div
									className={flexPointClass('center', 'center')}
									onClick={(e) => onClickSelectFlex(e, 'center', 'center')}></div>
								<div
									className={flexPointClass('flex-end', 'center')}
									onClick={(e) => onClickSelectFlex(e, 'flex-end', 'center')}></div>
							</div>
							<div className={s.display__flex_row}>
								<div
									className={flexPointClass('flex-start', 'flex-end')}
									onClick={(e) => onClickSelectFlex(e, 'flex-start', 'flex-end')}></div>
								<div
									className={flexPointClass('center', 'flex-end')}
									onClick={(e) => onClickSelectFlex(e, 'center', 'flex-end')}></div>
								<div
									className={flexPointClass('flex-end', 'flex-end')}
									onClick={(e) => onClickSelectFlex(e, 'flex-end', 'flex-end')}></div>
							</div>
						</div>
					</div>
					<Select
						className={s.display__select}
						onClickOption={(e, value) => setStyleHandler(e, value, 'justifyContent')}
						onDelete={(e) => onDeleteHandler(e, 'justifyContent')}
						defaultValue='Justify-content'
						values={justifyContentSelect}
						selectedValue={currentStyles.justifyContent}
					/>
					<Select
						className={s.display__select}
						onClickOption={(e, value) => setStyleHandler(e, value, 'alignItems')}
						onDelete={(e) => onDeleteHandler(e, 'alignItems')}
						defaultValue='Align-items'
						values={alignItemsSelect}
						selectedValue={currentStyles.alignItems}
					/>
					<Select
						className={s.display__select}
						onClickOption={(e, value) => setStyleHandler(e, value, 'alignContent')}
						onDelete={(e) => onDeleteHandler(e, 'alignContent')}
						defaultValue='Align-content'
						values={alignContentSelect}
						selectedValue={currentStyles.alignContent}
					/>

					<Select
						className={s.display__select}
						onClickOption={(e, value) => setStyleHandler(e, value, 'flexDirection')}
						onDelete={(e) => onDeleteHandler(e, 'flexDirection')}
						defaultValue='Flex-direction'
						values={flexDirectionSelect}
						selectedValue={currentStyles.flexDirection}
					/>
					<Select
						className={s.display__select}
						onClickOption={(e, value) => setStyleHandler(e, value, 'flexWrap')}
						onDelete={(e) => onDeleteHandler(e, 'flexWrap')}
						defaultValue='Flex-wrap'
						values={flexWrapSelect}
						selectedValue={currentStyles.flexWrap}
					/>
				</div>
			)}
		</div>
	);
};

export default DisplayBlock;
