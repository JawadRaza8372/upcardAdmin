import React from "react";
import { useLocation } from "react-router-dom";
import Routess from "./Routess";
import AnimatedSideBar from "../Components/SideBar/AnimatedSideBar";
function Navigation() {
	const location = useLocation()?.pathname;
	// if (isLoading) {
	//   return <Loader />;
	// }

	return (
		<>
			{location !== "/" ? (
				<AnimatedSideBar>
					<Routess />
				</AnimatedSideBar>
			) : (
				<Routess />
			)}
		</>
	);
}

export default Navigation;
