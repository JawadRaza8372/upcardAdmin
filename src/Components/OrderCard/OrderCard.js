import React from "react";
import "./OrderCard.scss";
import { useNavigate } from "react-router-dom";
import ButtonsDiv from "../ButtonsDiv/ButtonsDiv";

function OrderCard({ id, data }) {
	const navigate = useNavigate();

	return (
		<div className='ordrCard'>
			<p>
				<span>Order id:</span>
			</p>
			<p>{id}</p>
			<p>
				<span>Total Products:</span>
				{data?.products?.length}
			</p>
			<p>
				<span>Total Price:</span>€{data?.price}
			</p>
			<p>
				<span>Customer Name:</span>
			</p>
			<p>{data?.deliveryInfo?.name?.full_name}</p>
			<ButtonsDiv morefunct={() => navigate(`/order/${id}`)} />
		</div>
	);
}

export default OrderCard;
