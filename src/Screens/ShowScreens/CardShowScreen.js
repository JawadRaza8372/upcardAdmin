import React, { useState } from "react";
import "./ShowScreen.scss";
import { useDispatch, useSelector } from "react-redux";
import MetalCommonCard from "../../Components/CommonCard/MetalCommonCard";
import Loader from "../../Components/Loader/Loader";
import { uploadImage } from "../../Database/Database";
import { addCards, fetchMetalCards } from "../../Database/realtimedb";
import { setMetalCards } from "../../store/projectSlice";
import { Add, Close } from "@material-ui/icons";

const CardShowScreen = () => {
	const dispatch = useDispatch();

	const { metalCards } = useSelector((state) => state.project);
	const [showModelAd, setshowModelAd] = useState(false);
	const [isLoading, setisLoading] = useState(false);
	const [formSubmit, setformSubmit] = useState({
		title: "",
		description: "",
		oldprice: "",
		price: "",
		imgSrc: "",
		textColor: "#F0E1A3",
		category: "",
	});
	const adduserfunc = async (e) => {
		e.preventDefault();
		const result = await addCards(formSubmit);
		if (result?.msg !== "") {
			setformSubmit({
				title: "",
				description: "",
				oldprice: "",
				price: "",
				imgSrc: "",
				textColor: "#F0E1A3",
				category: "",
			});
			setshowModelAd(false);
			fetchMetalCards().then((cards) => {
				let resultarry = Object.keys(cards).map((dat, index) => {
					return { id: dat, ...Object.values(cards)[index] };
				});
				dispatch(setMetalCards({ metalCards: resultarry }));
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
									title: "",
									description: "",
									oldprice: "",
									price: "",
									imgSrc: "",
									textColor: "#F0E1A3",
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
								placeholder='Card Title'
								value={formSubmit.title}
								required
								onChange={(e) =>
									setformSubmit({
										...formSubmit,
										title: e.target.value,
										description: e.target.value,
									})
								}
							/>

							<input
								autoCapitalize='off'
								autoComplete='off'
								autoCorrect='off'
								type={"number"}
								placeholder='Current Price'
								required
								value={formSubmit.price}
								onChange={(e) =>
									setformSubmit({ ...formSubmit, price: e.target.value })
								}
							/>

							<input
								autoCapitalize='off'
								autoComplete='off'
								autoCorrect='off'
								type={"color"}
								placeholder='Color'
								value={formSubmit.textColor}
								required
								onChange={(e) =>
									setformSubmit({ ...formSubmit, textColor: e.target.value })
								}
							/>
							<select
								value={formSubmit?.category}
								onChange={(e) =>
									setformSubmit({ ...formSubmit, category: e.target.value })
								}>
								<option value={""} disabled>
									Choose Card Type
								</option>
								<option value={"football"}>Football</option>
								<option value={"others"}>Other</option>
							</select>

							{formSubmit?.imgSrc?.length > 0 ? (
								<div style={{ position: "relative", marginBottom: "20px" }}>
									<img
										style={{
											height: "170px",
											objectFit: "contain",
										}}
										src={formSubmit.imgSrc}
										alt='clublogo'
									/>
									<p
										style={{
											position: "absolute",
											top: "50px",
											right: "0px",
											left: "0px",
											color: formSubmit.textColor,
										}}>
										{`Card will have \n this color text`}
									</p>
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
												imgSrc: result?.secure_url,
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
				<h1>Show Cards</h1>
				<div className='addModelBtn'>
					<button onClick={() => setshowModelAd(true)}>
						<Add />
					</button>
				</div>
				<div className='cardsContainer'>
					{metalCards?.map((dat) => (
						<MetalCommonCard
							id={dat?.id}
							title={dat?.title}
							description={dat?.description}
							imag={dat?.imgSrc}
							oldpricce={dat?.oldprice}
							price={dat?.price}
							category={dat?.category}
							textColor={dat?.textColor}
							key={dat?.id}
						/>
					))}
				</div>
			</div>
			{isLoading && <Loader />}
		</>
	);
};

export default CardShowScreen;
