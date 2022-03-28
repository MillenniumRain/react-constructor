import React, { useEffect, useRef, useState } from 'react';
import s from './DragDrop.module.scss';

const DragDrop = (props) => {
	const dragBlock = useRef();
	const dragParent = useRef();

	const [coords, setCoords] = useState({ parent: {}, drag: {} });
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
			props.onMouseMove && props.onMouseMove(e, coords);
			checkAndSetCoords(e);
		}
	};
	const onMouseDownHandler = (e) => {
		props.onMouseDown && props.onMouseDown(e, coords);
		setMouseDown(true);
		checkAndSetCoords(e);
	};
	const onMouseUpHandler = (e) => {
		props.onMouseUp && props.onMouseUp(e, coords);
		setMouseDown(false);
	};
	useEffect(() => {
		const parent = dragParent?.current?.getBoundingClientRect();
		const drag = dragBlock?.current?.getBoundingClientRect();

		setCoords({
			parent: { rect: parent },
			drag: { rect: drag, x: 0, y: 0 },
		});
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
			className={props.className}
			style={props.style}
			onMouseMove={onMouseMoveHandler}
			onMouseDown={onMouseDownHandler}>
			{props.children}
			<div
				ref={dragBlock}
				className={props.dragClassName}
				style={{ position: 'absolute', left: coords.drag?.x + 'px', top: coords.drag?.y + 'px' }}></div>
		</div>
	);
};

export default DragDrop;
