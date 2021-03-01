import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import config from '../../config';
import * as styles from './main.module.scss';
import FeatherIcon from 'feather-icons-react';

const Signup = () => {
	const history = useHistory();
	const { register, handleSubmit, errors, watch } = useForm();
	const [message, setMessage] = useState();
	const [passwordShown, setPasswordShown] = useState(false);
	const password = useRef({});
	password.current = watch('password', '');

	const togglePasswordVisiblity = () => {
		setPasswordShown(passwordShown ? false : true);
	};
	const onSubmit = (data, e) => {
		fetch(`${config.apiRequestUrl}/signup`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((data) => {
				const hasError = 'error' in data && data.error != null;
				setMessage({
					data: hasError ? data.error : 'Registered successfully',
					type: hasError ? 'alert-danger' : 'alert-success',
				});

				!hasError && e.target.reset();
				setTimeout(() => {
					history.push('/login');
				}, 2000);
			});
	};

	return (
		<div
			className={`${styles.container} container-fluid d-flex justify-content-center text-center align-items-center`}
		>
			<h1>Never look back</h1>
			<div className={styles.registrationFormContainer}>
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
				<h2>Join us now!</h2>
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
							placeholder='joe@me.com'
							ref={register({
								required: {
									value: true,
									message: 'Please enter your email address',
								},
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
									message: 'Enter a valid email address',
								},
							})}
						/>
						{errors.Email && (
							<span
								className={`${styles.errorMessage} mandatory`}
							>
								{errors.Email.message}
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
					<div className='form-group'>
						<input
							name='repeatPassword'
							type='password'
							className={`form-control ${styles.inputDetails} ${
								errors.repeatPassword ? 'is-invalid' : ''
							}`}
							id='inputForRepeatPassword'
							placeholder='Confirm Password'
							ref={register({
								validate: (value) =>
									value === password.current ||
									'The passwords do not match',
							})}
						/>
						{errors.repeatPassword && (
							<span
								className={`${styles.errorMessage} mandatory`}
							>
								{errors.repeatPassword.message}
							</span>
						)}
					</div>
					<div className={`${styles.termsAndConditions} d-flex`}>
						<input
							name='checkbox'
							className={styles.checkMark}
							type='checkbox'
							value=''
							id='flexCheckDefault'
							ref={register({
								required: {
									value: true,
									message:
										'Please agree with Terms and Conditions',
								},
							})}
						/>
						<span className={styles.checkbox} />
						<p
							className={`${styles.labelText} form-check-label text-left`}
						>
							I agree to no{' '}
							<span className={styles.bold}>
								Terms and Conditions and Privacy Policy.
							</span>
						</p>
					</div>
					<div className='d-flex align-items-center justify-content-center flex-column '>
						<button
							type='submit'
							className={`${styles.createAccount} btn`}
						>
							Create Account
						</button>
						<button className={`${styles.logIn} btn btn-link`}>
							<Link to='/login'>Already a member? Sign in</Link>
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Signup;
