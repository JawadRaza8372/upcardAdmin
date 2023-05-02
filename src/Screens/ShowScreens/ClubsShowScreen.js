import React, { useState } from "react";
import "./ShowScreen.scss";
import { useDispatch, useSelector } from "react-redux";
import ClubCommonCard from "../../Components/CommonCard/ClubCommonCard";
import Loader from "../../Components/Loader/Loader";
import { addClubs, fetchClubs } from "../../Database/realtimedb";
import { setClubs } from "../../store/projectSlice";
import { uploadImage } from "../../Database/Database";
import { Add, Close } from "@material-ui/icons";

const ClubsShowScreen = () => {
	const { clubs } = useSelector((state) => state.project);
	const dispatch = useDispatch();
	const [showModelAd, setshowModelAd] = useState(false);
	const [isLoading, setisLoading] = useState(false);
	const [formSubmit, setformSubmit] = useState({
		name: "",
		badge: "",
		category: "",
	});
	const adduserfunc = async (e) => {
		e.preventDefault();
		const result = await addClubs(formSubmit);
		if (result?.msg !== "") {
			setformSubmit({
				name: "",
				badge: "",
				category: "",
			});
			setshowModelAd(false);
			fetchClubs().then((clubs) => {
				let resultarry = Object.keys(clubs).map((dat, index) => {
					return { id: dat, ...Object.values(clubs)[index] };
				});
				dispatch(setClubs({ clubs: resultarry }));
			});
			alert("Updated Successfully");
		} else {
			alert("internal server error");
		}
	};
	return (
		<>
			{showModelAd && (
				<div className='addModel'>
					<div className='closeContainer'>
						<button
							onClick={() => {
								setshowModelAd(false);
								setformSubmit({
									name: "",
									badge: "",
									category: "",
								});
							}}>
							<Close />
						</button>
					</div>
					<div className='contentCContainer'>
						<form onSubmit={adduserfunc} className='formontainerUpdate'>
							<input
								autoCapitalize='off'
								autoComplete='off'
								autoCorrect='off'
								type={"text"}
								placeholder='Name'
								value={formSubmit.name}
								onChange={(e) =>
									setformSubmit({ ...formSubmit, name: e.target.value })
								}
								required
							/>

							<select
								value={formSubmit?.category}
								onChange={(e) =>
									setformSubmit({ ...formSubmit, category: e.target.value })
								}>
								<option disabled defaultChecked value={""}>
									Choose Category
								</option>

								<option value={"champion"}>Championship</option>
								<option value={"premium"}>Premium League</option>
								<option value={"others"}>Others</option>
							</select>

							{formSubmit?.badge?.length > 0 ? (
								<div style={{ position: "relative", marginBottom: "20px" }}>
									<img
										style={{
											height: "170px",
											objectFit: "contain",
										}}
										src={formSubmit.badge}
										alt='clublogo'
									/>
								</div>
							) : (
								<input
									autoCapitalize='off'
									autoComplete='off'
									autoCorrect='off'
									required
									type={"file"}
									onChange={async (e) => {
										setisLoading(true);
										const result = await uploadImage(e.target.files[0]);
										setisLoading(false);
										if (result?.secure_url?.length > 0) {
											setformSubmit({
												...formSubmit,
												badge: result?.secure_url,
											});
										}
									}}
								/>
							)}
							<button type='submit'>Submit</button>
						</form>
					</div>
				</div>
			)}
			<div className='showMainContainer'>
				<h1>Show Clubs</h1>
				<div className='addModelBtn'>
					<button onClick={() => setshowModelAd(true)}>
						<Add />
					</button>
				</div>
				<div className='cardsContainer'>
					{clubs?.map((dat) => (
						<ClubCommonCard
							key={dat?.id}
							id={dat?.id}
							title={dat?.name}
							imag={dat?.badge}
							category={dat?.category}
						/>
					))}
				</div>
			</div>
			{isLoading && <Loader />}
		</>
	);
};

export default ClubsShowScreen;
