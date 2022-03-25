import React, { useEffect, useRef, useState } from 'react';
import s from './DragDrop.module.scss';

const DragDrop = (props) => {
	const dragBlock = useRef();
	const dragParent = useRef();

	const [coords, setCoords] = useState({ parent: {}, drag: {} });
	const [mouseDown, setMouseDown] = useState(false);

	const checkAndSetCoords = (e) => {
		let x = e.pageX - coords.parent.rect.left - Math.round(coords.drag.rect.width / 2);
		let y = e.pageY - coords.parent.rect.top - Math.round(coords.drag.rect.height / 2);
		if (x < 0) {
			x = 0;
		}
		if (x + coords.drag.rect.width > coords.parent.rect.width) {
			x = coords.parent.rect.width - coords.drag.rect.width;
		}
		if (y < 0) {
			y = 0;
		}
		if (y + coords.drag.rect.height > coords.parent.rect.height) {
			y = coords.parent.rect.height - coords.drag.rect.height;
		}

		setCoords({ ...coords, drag: { ...coords.drag, x, y } });
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
		const parent = dragParent?.current;
		const drag = dragBlock?.current;

		setCoords({
			parent: { rect: parent.getBoundingClientRect() },
			drag: { rect: drag.getBoundingClientRect(), x: 0, y: 0 },
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
