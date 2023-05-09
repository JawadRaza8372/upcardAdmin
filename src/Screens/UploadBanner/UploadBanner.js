import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "../../Database/Database";
import { fetchBanner, updateBanner } from "../../Database/realtimedb";
import { setBanner } from "../../store/projectSlice";
import Loader from "../../Components/Loader/Loader";

const UploadBanner = () => {
	const { banner } = useSelector((state) => state.project);
	const [isLoading, setisLoading] = useState(false);
	const [inputValue, setinputValue] = useState(null);
	const dispatch = useDispatch();
	const onuploadfunc = async (e) => {
		e.preventDefault();
		setisLoading(true);
		const result = await uploadImage(inputValue);
		if (result) {
			const rest = await updateBanner(result?.secure_url);
			if (rest?.msg) {
				fetchBanner().then((banner) => {
					dispatch(setBanner({ banner: banner }));
				});
			} else {
				console.log(rest?.error);
			}
		} else {
			console.log("error");
		}
		setisLoading(false);
	};
	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<div className='showMainContainer'>
					<h1>Banner</h1>
					<img
						src={banner}
						style={{ width: "100%", height: "250px", objectFit: "contain" }}
						alt='hy'
					/>
					<form className='bannerForm' onSubmit={onuploadfunc}>
						<input
							type='file'
							onChange={(e) => {
								setinputValue(e.target.files[0]);
							}}
						/>
						<button type='submit'>Update</button>
					</form>
				</div>
			)}
		</>
	);
};

export default UploadBanner;
