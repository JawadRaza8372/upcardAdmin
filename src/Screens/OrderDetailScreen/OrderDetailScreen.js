import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./OrderDetailScreen.scss";

function OrderDetailScreen() {
	const { id } = useParams();

	const { orders } = useSelector((state) => state.project);

	const result = orders.filter((dat) => dat.id === id);
	const final =
		result?.length > 0
			? result[0]
			: {
					deliveryInfo: {},
					id: "----",
					postedBy: "----",
					price: 0,
					products: [],
			  };
	return (
		<div className='orderdeltscreen'>
			<div className='ordernumber'>
				<h1>Order Details</h1>
			</div>

			<h1>Order id:</h1>
			<p>{id}</p>
			{final?.deliveryInfo && (
				<>
					<h1>Delivery Address:</h1>
					<p>
						{final?.deliveryInfo?.address?.address_line_1} ,{" "}
						{final?.deliveryInfo?.address?.admin_area_2} ,{" "}
						{final?.deliveryInfo?.address?.admin_area_1}
					</p>
					<h1>Country Code:</h1>
					<p>{final?.deliveryInfo?.address?.country_code}</p>
					<h1>Postal Code:</h1>
					<p>{final?.deliveryInfo?.address?.postal_code}</p>
					<h1>Customer Name:</h1>
					<p>{final?.deliveryInfo?.name?.full_name}</p>
					<h1>Total</h1>
					<p>€{final?.price}</p>
				</>
			)}
			{final?.products.length > 0 && (
				<>
					<h1>Products</h1>
					<div className='ordercontainerscard'>
						{final?.products.map((dat) => (
							<>
								<div className='ordercard'>
									<div className='orderimg'>
										<img src={dat?.imgSrc} alt='product' />
									</div>
									<div className='extraservies'>
										<h5>Product Id:</h5>
										<p>{dat?.pid}</p>
									</div>
								</div>
							</>
						))}
					</div>
				</>
			)}
			{final?.extras.length > 0 && (
				<>
					<h1>Extras</h1>
					<div className='ordercontainerscard'>
						{final?.extras.map((dat) => (
							<>
								<div className='ordercard'>
									<div className='extraservies'>
										<h5>Title:</h5>
										<p>
											{dat?.title}+ €{dat?.price}
										</p>
										<h5>Description:</h5>
										<p>{dat?.subtitle}</p>
									</div>
								</div>
							</>
						))}
					</div>
				</>
			)}
		</div>
	);
}

export default OrderDetailScreen;
