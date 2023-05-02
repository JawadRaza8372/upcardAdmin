import React from "react";
import { useNavigate } from "react-router-dom";
import "./ErrorPage.scss";
function ErrorPage() {
	const navigate = useNavigate();

	return (
		<div className='mainSection'>
			<h1 className='formHeading'>Page Not Found</h1>
			<button onClick={() => navigate(`/`)}>Home</button>
		</div>
	);
}

export default ErrorPage;
