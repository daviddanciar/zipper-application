import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import config from '../../config';
import * as styles from './main.module.scss';
import FeatherIcon from 'feather-icons-react';

const LogIn = () => {
	const history = useHistory();
	const { register, handleSubmit, errors } = useForm();
	const [message, setMessage] = useState();
	const [passwordShown, setPasswordShown] = useState(false);

	const togglePasswordVisiblity = () => {
		setPasswordShown(passwordShown ? false : true);
	};

	const onSubmit = (data, e) => {
		fetch(`${config.apiRequestUrl}/signin`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then(({ error, data }) => {
				if (data) {
					localStorage.setItem('accessToken', data.accessToken);
					setMessage({
						data: 'Logged in successfully, redirecting...',
						type: 'alert-success',
					});
					setTimeout(() => {
						history.push('/dashboard');
					}, 2000);
				} else {
					setMessage({
						data: 'Something went wrong, please try again',
						type: 'alert-danger',
					});
					e.target.reset();
				}
			});
	};

	return (
		<div
			className={`${styles.container} container-fluid d-flex align-items-center justify-content-center`}
		>
			<h1 className='text-center'>Never look back</h1>
			<div className={styles.loginFormContainer}>
				{message && (
					<div
						className={`alert fade show d-flex ${message.type}`}
						role='alert'
					>
						{message.data}
						<span
							aria-hidden='true'
							className='ml-auto cursor-pointer'
							onClick={() => setMessage(null)}
						>
							&times;
						</span>
					</div>
				)}
				<h2 className='text-center'>Wellcome back!</h2>
				<form
					onSubmit={handleSubmit(onSubmit)}
					noValidate
					autoComplete='off'
				>
					<div className='form-group'>
						<input
							id='inputForEmail'
							name='email'
							type='email'
							className={`${styles.inputDetails} form-control`}
							aria-describedby='Enter email address'
							placeholder='Enter email address'
							ref={register({
								required: {
									value: true,
									message: 'Please enter your email address',
								},
							})}
						/>
						{errors.email && (
							<span
								className={`${styles.errorMessage} mandatory`}
							>
								{errors.email.message}
							</span>
						)}
					</div>
					<div className='form-group'>
						<input
							type={passwordShown ? 'text' : 'password'}
							name='password'
							className={`${styles.inputDetails} form-control`}
							id='inputForPassword'
							placeholder='Enter password'
							ref={register({
								required: {
									value: true,
									message: 'Please enter password',
								},
							})}
						/>
						<FeatherIcon
							size='20'
							icon='eye'
							onClick={togglePasswordVisiblity}
						/>
						{errors.password && (
							<span
								className={`${styles.errorMessage} mandatory`}
							>
								{errors.password.message}
							</span>
						)}
					</div>
					<div className='d-flex align-items-center justify-content-center flex-column '>
						<button type='submit' className={`${styles.logIn} btn`}>
							Login
						</button>
						<button className={`${styles.signUp} btn btn-link`}>
							<Link to='/signup'>
								New around here? Sign up now
							</Link>
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LogIn;
