import React, { useEffect, useRef, useState } from 'react';
// import s from './DragDrop.module.scss';

const DragDrop = ({
	children,
	setSize,
	onMouseMove,
	onMouseDown,
	onMouseUp,
	className,
	dragClassName,
	style,
	positionX,
	positionY,
}) => {
	const dragBlock = useRef();
	const dragParent = useRef();

	const [coords, setCoords] = useState({ parent: {}, drag: { x: null, y: null } });
	const [mouseDown, setMouseDown] = useState(false);

	const checkAndSetCoords = (e) => {
		const parent = dragParent?.current?.getBoundingClientRect();
		const drag = dragBlock?.current?.getBoundingClientRect();

		let x = e.pageX - parent.left - Math.round(drag.width / 2);
		let y = e.pageY - parent.top - Math.round(drag.height / 2);
		if (x < 0) {
			x = 0;
		}
		if (x + drag.width > parent.width) {
			x = parent.width - drag.width;
		}
		if (y < 0) {
			y = 0;
		}
		if (y + drag.height > parent.height) {
			y = parent.height - drag.height;
		}

		setCoords({ parent: { rect: parent }, drag: { rect: drag, x, y } });
	};
	const onMouseMoveHandler = (e) => {
		if (mouseDown) {
			onMouseMove && onMouseMove(e, coords);
			checkAndSetCoords(e);
		}
	};
	const onMouseDownHandler = (e) => {
		onMouseDown && onMouseDown(e, coords);
		setMouseDown(true);
		checkAndSetCoords(e);
	};
	const onMouseUpHandler = (e) => {
		onMouseUp && onMouseUp(e, coords);
		setMouseDown(false);
	};
	useEffect(() => {
		const parent = dragParent?.current?.getBoundingClientRect();
		const drag = dragBlock?.current?.getBoundingClientRect();
		setCoords({
			parent: { rect: parent },
			drag: { rect: drag, x: null, y: null },
		});
		setSize({ parent, drag });
		document.addEventListener('mouseup', onMouseUpHandler);
		// document.addEventListener('mousemove', onMouseMoveHandler);
		return () => {
			document.removeEventListener('mouseup', onMouseUpHandler);
			// document.removeEventListener('mousemove', onMouseMoveHandler);
		};
	}, []);

	return (
		<div
			ref={dragParent}
			className={className}
			style={style}
			onMouseMove={onMouseMoveHandler}
			onMouseDown={onMouseDownHandler}>
			{children}
			<div
				ref={dragBlock}
				className={dragClassName}
				style={{
					position: 'absolute',
					left: (coords.drag?.x || positionX) + 'px',
					top: (coords.drag?.y || positionY) + 'px',
				}}></div>
		</div>
	);
};

export default DragDrop;
