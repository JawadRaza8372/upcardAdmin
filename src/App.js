import Navigation from "./Navigation/Navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "./store/authSlice";
import {
	setProducts,
	setClubs,
	setMetalCards,
	setOrders,
	setLanguages,
	setBanner,
} from "./store/projectSlice";
import { collection, onSnapshot } from "firebase/firestore";
import { dbs } from "./Database/Database";
import {
	fetchBanner,
	fetchClubs,
	fetchLanguage,
	fetchMetalCards,
	fetchOtherProducts,
} from "./Database/realtimedb";
const apiurl = "https://carsrentalsystem1937.herokuapp.com";

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		fetchClubs().then((clubs) => {
			let resultarry = Object.keys(clubs).map((dat, index) => {
				return { id: dat, ...Object.values(clubs)[index] };
			});
			dispatch(setClubs({ clubs: resultarry }));
		});
		fetchMetalCards().then((cards) => {
			let resultarry = Object.keys(cards).map((dat, index) => {
				return { id: dat, ...Object.values(cards)[index] };
			});
			dispatch(setMetalCards({ metalCards: resultarry }));
		});
		fetchOtherProducts().then((otherproducts) => {
			let resultarry = Object.keys(otherproducts).map((dat, index) => {
				return { id: dat, ...Object.values(otherproducts)[index] };
			});
			dispatch(setProducts({ products: resultarry }));
		});
		fetchBanner().then((banner) => {
			dispatch(setBanner({ banner: banner }));
		});
		fetchLanguage().then((languages) => {
			let resultarry = Object.keys(languages).map((dat, index) => {
				return { id: dat, ...Object.values(languages)[index] };
			});
			dispatch(setLanguages({ languages: resultarry }));
		});
		onSnapshot(collection(dbs, "Orders"), (snapshot) => {
			const result = snapshot.docs.map((doc) => {
				return { id: doc?.id, ...doc.data() };
			});
			dispatch(setOrders({ orders: result }));
		});

		let result = localStorage.getItem("upcradAdminDashbord");
		if (result?.length > 0) {
			dispatch(setAuth({ isAuth: "avalble" }));
		}
	});

	return (
		<>
			<Navigation />
		</>
	);
}

export default App;
export { apiurl };
