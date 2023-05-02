import React, { useState } from "react";
import { delClubs, fetchClubs, updateClubs } from "../../Database/realtimedb";
import { useDispatch } from "react-redux";
import { setClubs } from "../../store/projectSlice";
import NewBtnDivs from "../ButtonsDiv/NewBtnDivs";
import { Close } from "@material-ui/icons";
const ClubCommonCard = ({ id, imag, title, category }) => {
	const dispatch = useDispatch();

	const fetchdata = () => {
		fetchClubs().then((clubs) => {
			let resultarry = Object.keys(clubs).map((dat, index) => {
				return { id: dat, ...Object.values(clubs)[index] };
			});
			dispatch(setClubs({ clubs: resultarry }));
		});
	};
	const [showModel, setshowModel] = useState(false);
	const [formData, setformData] = useState({
		badge: imag,
		category: category,
		name: title,
	});
	const deleteCard = async (idx) => {
		const result = await delClubs(idx);
		if (result?.msg !== "") {
			fetchdata();
			alert("Deleted Successfully");
		} else {
			alert("internal server error");
		}
	};
	const updateData = async (idx, data) => {
		const result = await updateClubs(idx, data);
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
					<b>Name: </b>
					{title ? title : "---"}
				</h3>
				<h4>
					<b>Category: </b>

					{category ? category : "---"}
				</h4>
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
								value={formData?.name}
								onChange={(e) =>
									setformData({ ...formData, name: e.target.value })
								}
								placeholder='name'
							/>

							<select
								value={formData?.category}
								onChange={(e) =>
									setformData({ ...formData, category: e.target.value })
								}>
								<option value={""} disabled>
									Choose Club Category
								</option>
								<option value={"champion"}>Championship</option>
								<option value={"premium"}>Premium League</option>
								<option value={"others"}>Others</option>
							</select>
							<button onClick={() => updateData(id, formData)}>Update</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ClubCommonCard;
