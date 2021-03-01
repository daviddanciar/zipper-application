import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import config from '../../config';
import Card from '../Card/Card';
import { slice, concat } from 'lodash';

import * as styles from './main.module.scss';

const LENGTH = 50;
const LIMIT = 6;

const Dashboard = () => {
	const [apiData, setApiData] = useState(null);
	const history = useHistory();
	const [showMore, setShowMore] = useState(true);
	const [list, setList] = useState(null);
	const [index, setIndex] = useState(LIMIT);

	const loadMore = () => {
		const newIndex = index + LIMIT;
		const newShowMore = newIndex < LENGTH - 1;
		const newList = concat(list, slice(apiData.rows, index, newIndex));
		setIndex(newIndex);
		setList(newList);
		setShowMore(newShowMore);
	};
	const logout = () => {
		/* eslint-disable */
		const toLogout = confirm('Are you sure to logout ?');
		/* eslint-enable */
		if (toLogout) {
			localStorage.clear();
			history.push('/login');
		}
	};

	useEffect(() => {
		if (apiData) {
			setList(slice(apiData.rows, 0, LIMIT));
			return;
		}
		fetch(`${config.apiRequestUrl}/products?limit=50&offset=0`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
			},
		})
			.then((res) => res.json())
			.then(({ error, data }) => {
				setApiData(data);
			});
	}, [apiData, setApiData]);
	if (list === null) {
		return (
			<div className={styles.warrning}>
				<p>Something went wrong! </p>
			</div>
		);
	}
	return (
		<div
			className={`${styles.container} container-fluid d-flex flex-column align-items-center`}
		>
			<nav
				className={`${styles.navigation}  d-flex align-items-center justify-content-center`}
			>
				<div
					className={`${styles.dashboard}  d-flex justify-content-between`}
				>
					<span className='logo text-center'>Never look back</span>
					<button className={styles.logOut} onClick={() => logout()}>
						Log out
					</button>
				</div>
			</nav>
			<div
				className={`${styles.main} d-flex justify-content-center flex-wrap`}
			>
				{list &&
					list.map(({ title, imageUrl, description, id }) => (
						<Card
							title={title}
							imageUrl={imageUrl}
							description={description}
							key={id}
						/>
					))}
			</div>
			{showMore && (
				<button className={styles.loadMore} onClick={loadMore}>
					Load More
				</button>
			)}
		</div>
	);
};

export default Dashboard;
