import React, { useState } from "react";
import "./ShowScreen.scss";
import { useSelector, useDispatch } from "react-redux";
import CommonCard from "../../Components/CommonCard/CommonCard";
import Loader from "../../Components/Loader/Loader";
import { uploadImage } from "../../Database/Database";
import { addotherprod, fetchOtherProducts } from "../../Database/realtimedb";
import { setProducts } from "../../store/projectSlice";
import { Add, Close } from "@material-ui/icons";

const ProductShowScreen = () => {
	const dispatch = useDispatch();
	const { products } = useSelector((state) => state.project);
	const [showModelAd, setshowModelAd] = useState(false);
	const [isLoading, setisLoading] = useState(false);
	const [formSubmit, setformSubmit] = useState({
		title: "",
		description: "",
		oldprice: "",
		price: "",
		imgSrc: "",
		textColor: "#F0E1A3",
		category: "other",
	});
	const adduserfunc = async (e) => {
		e.preventDefault();
		const result = await addotherprod(formSubmit);
		if (result?.msg !== "") {
			setformSubmit({
				title: "",
				description: "",
				oldprice: "",
				price: "",
				imgSrc: "",
				textColor: "#F0E1A3",
				category: "other",
			});
			setshowModelAd(false);
			fetchOtherProducts().then((otherproducts) => {
				let resultarry = Object.keys(otherproducts).map((dat, index) => {
					return { id: dat, ...Object.values(otherproducts)[index] };
				});
				dispatch(setProducts({ products: resultarry }));
			});
			alert("Updated Successfully");
		} else {
			alert("internal server error");
		}
	};
	return (
		<>
			{" "}
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
									category: "other",
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
									setformSubmit({ ...formSubmit, title: e.target.value })
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
								type={"text"}
								placeholder='Description'
								value={formSubmit.description}
								onChange={(e) =>
									setformSubmit({ ...formSubmit, description: e.target.value })
								}
							/>

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
				<h1>Show Products</h1>
				<div className='addModelBtn'>
					<button onClick={() => setshowModelAd(true)}>
						<Add />
					</button>
				</div>
				<div className='cardsContainer'>
					{products?.map((dat) => (
						<CommonCard
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

export default ProductShowScreen;
