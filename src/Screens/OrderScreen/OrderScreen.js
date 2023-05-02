import React from "react";
import { useSelector } from "react-redux";
import OrderCard from "../../Components/OrderCard/OrderCard";
import "./OrderScreen.scss";

function OrderScreen() {
	const { orders } = useSelector((state) => state.project);
	return (
		<div className='mainSubcont'>
			<h1>Show Orders</h1>
			<div className='cardContanier'>
				{orders.map((dat) => (
					<OrderCard data={dat} id={dat.id} key={dat.id} />
				))}
			</div>
		</div>
	);
}

export default OrderScreen;
