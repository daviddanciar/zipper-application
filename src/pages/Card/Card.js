import React from 'react';
import * as styles from './main.module.scss';

const Card = ({ title, description, imageUrl }) => {
	return (
		<div className={styles.card}>
			<img src={imageUrl} alt='view' className={styles.img} />
			<div className={styles.description}>
				<h3>{title}</h3>
				<p>{description}</p>
			</div>
			<div className={`${styles.price} text-center`}>
				<span>$25.89</span>
			</div>
		</div>
	);
};

export default Card;
