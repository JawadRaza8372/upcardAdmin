import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import AuthScreen from "../Screens/AuthScreen/AuthScreen";
import OrderScreen from "../Screens/OrderScreen/OrderScreen";
import OrderDetailScreen from "../Screens/OrderDetailScreen/OrderDetailScreen";
import { useSelector } from "react-redux";
import ErrorPage from "../Screens/ErrorPage/ErrorPage";
import CardShowScreen from "../Screens/ShowScreens/CardShowScreen";
import ProductShowScreen from "../Screens/ShowScreens/ProductShowScreen";
import ClubsShowScreen from "../Screens/ShowScreens/ClubsShowScreen";
import LanguagesScreen from "../Screens/LanguagesScreen/LanguagesScreen";

function Routess() {
	return (
		<Routes>
			<Route
				path='/'
				element={
					<AuthRoute>
						<AuthScreen />
					</AuthRoute>
				}
			/>
			<Route
				path='/showCards'
				element={
					<ProtectedRoute>
						<CardShowScreen />
					</ProtectedRoute>
				}
			/>
			<Route
				path='/showProducts'
				element={
					<ProtectedRoute>
						<ProductShowScreen />
					</ProtectedRoute>
				}
			/>
			<Route
				path='/showClubs'
				element={
					<ProtectedRoute>
						<ClubsShowScreen />
					</ProtectedRoute>
				}
			/>

			<Route
				path='/laguages'
				element={
					<ProtectedRoute>
						<LanguagesScreen />
					</ProtectedRoute>
				}
			/>
			<Route
				path='/orders'
				element={
					<ProtectedRoute>
						<OrderScreen />
					</ProtectedRoute>
				}
			/>
			<Route
				path='/order/:id'
				element={
					<ProtectedRoute>
						<OrderDetailScreen />
					</ProtectedRoute>
				}
			/>
			<Route path='*' element={<ErrorPage />} />
		</Routes>
	);
}
let ProtectedRoute = ({ children }) => {
	const { isAuth } = useSelector((state) => state.auth);
	return isAuth ? children : <Navigate to='/' />;
};
let AuthRoute = ({ children }) => {
	const { isAuth } = useSelector((state) => state.auth);

	return isAuth ? <Navigate to='/orders' /> : children;
};
export default Routess;
