import React from 'react';

import * as styles from './main.module.scss';

const NotFound = () => {
	return (
		<div
			className={`${styles.container} container-fluid d-flex justify-content-center text-center align-items-center`}
		>
			<h1 className='text-center'>PAGE NOT FOUND</h1>
		</div>
	);
};

export default NotFound;
