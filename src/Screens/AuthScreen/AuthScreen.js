import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "../../store/authSlice";
import "./AuthScreen.scss";
import logo from "../../ownassets/smalllog.png";
function Home() {
	const [loginForm, setloginForm] = useState({ email: "", password: "" });
	const dispatch = useDispatch();
	const submitFun = (e) => {
		e.preventDefault();
		if (loginForm.email === "upcrad@admin.com") {
			if (loginForm.password === "admin123") {
				dispatch(setAuth({ isAuth: "avalble" }));
				localStorage.setItem("upcradAdminDashbord", "avalble");
			} else {
				alert("Wrong Password.");
			}
		} else {
			alert("Invalid Email.");
		}
		console.log("submit", loginForm);
	};
	const changeText = (e) => {
		const name = e.target.id;
		const value = e.target.value;
		setloginForm((prevalue) => {
			return {
				...prevalue,
				[name]: value,
			};
		});
	};
	return (
		<section className='mainSection'>
			<img src={logo} alt='logo' />
			<div className='formContainer'>
				<h1 className='formHeading'>Admin Panel</h1>
				<form className='loginForm' onSubmit={submitFun}>
					<input
						type='email'
						placeholder='email'
						id='email'
						minLength={11}
						onChange={changeText}
						autoCapitalize='off'
						autoComplete='off'
						autoCorrect='off'
					/>
					<input
						type='password'
						placeholder='password'
						id='password'
						minLength={5}
						onChange={changeText}
						autoCapitalize='off'
						autoComplete='off'
						autoCorrect='off'
					/>
					<button type='submit'>Login</button>
				</form>
			</div>
		</section>
	);
}

export default Home;
