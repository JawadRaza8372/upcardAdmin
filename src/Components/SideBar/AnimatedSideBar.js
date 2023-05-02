import React, { useState, useEffect } from "react";
import "./AnimatedSideBar.scss";
import MenuIcon from "@material-ui/icons/Menu";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import CloseIcon from "@material-ui/icons/Close";
import DirectionsCar from "@material-ui/icons/DirectionsCar";
import LinkButton from "./LinkButton";
import logo from "../../ownassets/smalllog.png";
import { setAuth } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import {
	ListAlt,
	SportsFootball,
	Group,
	CardGiftcard,
	Language,
} from "@material-ui/icons";
function AnimatedSideBar({ children }) {
	const navigate = useNavigate();
	const { isAuth } = useSelector((state) => state.auth);
	const [expand, setexpand] = useState(false);
	const dispatch = useDispatch();
	const [activeLogo, setactiveLogo] = useState(false);
	const [screenSize, setscreenSize] = useState(null);
	const navArry = [
		{
			title: "Orders",
			icon: <ListAlt id='navIcon' />,
			link: "/orders",
		},
		{
			title: "Clubs",
			icon: <Group id='navIcon' />,
			link: "/showClubs",
		},
		{
			title: "Cards",
			icon: <SportsFootball id='navIcon' />,
			link: "/showCards",
		},
		{
			title: "Products",
			icon: <CardGiftcard id='navIcon' />,
			link: "/showProducts",
		},
		{
			title: "Languages",
			icon: <Language id='navIcon' />,
			link: "/laguages",
		},
	];

	useEffect(() => {
		const handleResize = () => {
			setscreenSize(window.innerWidth);
			window.addEventListener("resize", handleResize);
		};
		handleResize();

		return () => window.removeEventListener("resize", handleResize);
	}, []);
	useEffect(() => {
		if (screenSize < 480) {
			setactiveLogo(true);
		} else {
			setactiveLogo(false);
		}
	}, [screenSize]);

	// if (isLoading === true) {
	//   <Loader />;
	// }
	return (
		<section className='mainContainer'>
			<div className={expand ? "sidebar active" : "sidebar"}>
				<div className='logoContent'>
					<div className='logo'>
						<img
							style={{
								objectFit: "contain",
								height: "40px",
								width: "40px",
								marginRight: "10px",
							}}
							src={logo}
							alt='smalllogo'
						/>
						<div className='logoName'>Admin Panel</div>
					</div>
					{expand && !activeLogo ? (
						<CloseIcon id='menuIcon' onClick={() => setexpand(false)} />
					) : !expand && !activeLogo ? (
						<MenuIcon id='menuIcon' onClick={() => setexpand(true)} />
					) : activeLogo ? (
						<DirectionsCar id='logoImg' onClick={() => navigate("/")} />
					) : null}
				</div>
				<ul className='navList'>
					{navArry.map((dat, index) => (
						<li key={index}>
							<LinkButton title={dat.title} link={dat.link}>
								{dat.icon}
							</LinkButton>
						</li>
					))}
				</ul>
				<div className='profileContent'>
					{isAuth && (
						<div
							onClick={() => {
								localStorage.removeItem("upcradAdminDashbord");
								dispatch(setAuth({ isAuth: null }));
							}}
							className='profile'>
							<LogoutIcon id='logoutbutton' />

							<span className='username'>Logout</span>
						</div>
					)}
				</div>
			</div>
			<div
				className={
					expand ? "mainContentContainer active" : "mainContentContainer"
				}>
				{children}
			</div>
		</section>
	);
}

export default AnimatedSideBar;
