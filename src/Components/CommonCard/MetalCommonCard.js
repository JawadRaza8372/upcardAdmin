import React, { useState } from "react";
import {
	delMetalCards,
	fetchMetalCards,
	updateMetalCards,
} from "../../Database/realtimedb";
import { useDispatch } from "react-redux";
import { setMetalCards } from "../../store/projectSlice";
import NewBtnDivs from "../ButtonsDiv/NewBtnDivs";
import { Close } from "@material-ui/icons";
const MetalCommonCard = ({
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
		fetchMetalCards().then((cards) => {
			let resultarry = Object.keys(cards).map((dat, index) => {
				return { id: dat, ...Object.values(cards)[index] };
			});
			dispatch(setMetalCards({ metalCards: resultarry }));
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
		const result = await delMetalCards(idx);
		if (result?.msg !== "") {
			fetchdata();
			alert("Deleted Successfully");
		} else {
			alert("internal server error");
		}
	};
	const updateData = async (idx, data) => {
		const result = await updateMetalCards(idx, data);
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
						style={{ objectFit: "contain", marginBottom: "10px" }}
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
					<b>Old Price €:</b>
					{oldpricce ? `${oldpricce}` : "---"}{" "}
				</p>
				<p>
					<b>Current Price €:</b>
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

							<input
								type='number'
								value={formData?.price}
								placeholder='price'
								onChange={(e) =>
									setformData({ ...formData, price: e.target.value })
								}
							/>
							<input
								type='color'
								value={formData?.textColor}
								placeholder='color'
								onChange={(e) =>
									setformData({ ...formData, textColor: e.target.value })
								}
							/>
							<select
								value={formData?.category}
								onChange={(e) =>
									setformData({ ...formData, category: e.target.value })
								}>
								<option value={""} disabled>
									Choose Card Type
								</option>
								<option value={"football"}>Football</option>
								<option value={"others"}>Other</option>
							</select>
							<button onClick={() => updateData(id, formData)}>Update</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default MetalCommonCard;
