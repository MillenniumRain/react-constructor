import React, { useState } from 'react';
import { createPortal } from 'react-dom';
// import s from './Site.module.scss';

const Site = (props) => {
	return <>{props.children}</>;
	// const [contentRef, setContentRef] = useState(null);
	// let mountNode = contentRef?.contentWindow?.document?.body;

	// return (
	// 	<iframe
	// 		sandbox='allow-scripts allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation allow-top-navigation-by-user-activation '
	// 		width='100%'
	// 		height='800px'
	// 		scrolling='none'
	// 		marginwidth='0'
	// 		marginheight='0'
	// 		{...props}
	// 		ref={setContentRef}>
	// 		{mountNode && createPortal(props.children, mountNode)}
	// 	</iframe>
	// );
};

export default Site;
