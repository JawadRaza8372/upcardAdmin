import React, { useState } from "react";
import {
	delOtherProducts,
	fetchOtherProducts,
	updateOtherProducts,
} from "../../Database/realtimedb";
import { useDispatch } from "react-redux";
import { setProducts } from "../../store/projectSlice";
import NewBtnDivs from "../ButtonsDiv/NewBtnDivs";
import { Close } from "@material-ui/icons";
const CommonCard = ({
	id,
	imag,
	oldpricce,
	price,
	title,
	description,
	category,
	textColor,
}) => {
	const dispatch = useDispatch();

	const fetchdata = () => {
		fetchOtherProducts().then((otherproducts) => {
			let resultarry = Object.keys(otherproducts).map((dat, index) => {
				return { id: dat, ...Object.values(otherproducts)[index] };
			});
			dispatch(setProducts({ products: resultarry }));
		});
	};
	const [showModel, setshowModel] = useState(false);
	const [formData, setformData] = useState({
		title: title,
		description: description,
		imgSrc: imag,
		oldprice: oldpricce,
		price: price,
		category: category,
		textColor: textColor,
	});
	const deleteCard = async (idx) => {
		const result = await delOtherProducts(idx);
		if (result?.msg !== "") {
			fetchdata();
			alert("Deleted Successfully");
		} else {
			alert("internal server error");
		}
	};
	const updateData = async (idx, data) => {
		const result = await updateOtherProducts(idx, data);
		if (result?.msg !== "") {
			fetchdata();
			setshowModel(false);
			alert("Updated Successfully");
		} else {
			alert("internal server error");
		}
	};
	return (
		<>
			<div className='card'>
				<div className='cardimageCont'>
					<img
						src={imag}
						style={{ objectFit: "cover", marginBottom: "10px" }}
						alt='metalcard'
					/>
				</div>
				<h3>
					<b>Title: </b>
					{title ? title : "---"}
				</h3>
				<h4>
					<b>Description: </b>

					{description
						? description?.length > 25
							? description?.substring(0, 24) + " ..."
							: description
						: "---"}
				</h4>
				<p>
					<b>Old Price $:</b>
					{oldpricce ? `${oldpricce}` : "---"}{" "}
				</p>
				<p>
					<b>Current Price $:</b>
					{price ? `${price}` : "---"}
				</p>
				<NewBtnDivs
					deltFun={() => deleteCard(id)}
					morefunct={() => setshowModel(true)}
				/>
			</div>
			{showModel && (
				<div className='updateModel'>
					<div className='closeContainer'>
						<button onClick={() => setshowModel(false)}>
							<Close />
						</button>
					</div>
					<div className='contentbodyCConta'>
						<div className='formontainerUpdate'>
							<img src={imag} alt='metalcard' />
							<input
								type='text'
								value={formData?.title}
								onChange={(e) =>
									setformData({ ...formData, title: e.target.value })
								}
								placeholder='title'
							/>
							<textarea
								type='text'
								value={formData?.description}
								onChange={(e) =>
									setformData({ ...formData, description: e.target.value })
								}
								placeholder='description'
							/>
							<input
								type='number'
								value={formData?.oldprice}
								onChange={(e) =>
									setformData({ ...formData, oldprice: e.target.value })
								}
								placeholder='old price'
							/>
							<input
								type='number'
								value={formData?.price}
								placeholder='price'
								onChange={(e) =>
									setformData({ ...formData, price: e.target.value })
								}
							/>
							<button onClick={() => updateData(id, formData)}>Update</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default CommonCard;
