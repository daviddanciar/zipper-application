import React from 'react';
import {
	Route,
	BrowserRouter as Router,
	Switch,
	Redirect,
} from 'react-router-dom';

import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Dashboard from './pages/Dashboard/Dashboard';
import NotFound from './pages/NotFound/NotFound';

const authGuard = (Component) => () => {
	return localStorage.getItem('accessToken') ? (
		<Component />
	) : (
		<Redirect to='/login' />
	);
};

const Routes = (props) => (
	<Router {...props}>
		<Switch>
			<Route path='/login'>
				<Login />
			</Route>
			<Route path='/signup'>
				<Signup />
			</Route>
			<Route path='/dashboard' render={authGuard(Dashboard)} />
			<Route exact path='/'>
				<Redirect to='/signup' />
			</Route>
			<Route path='*'>
				<NotFound />
			</Route>
		</Switch>
	</Router>
);
export default Routes;
