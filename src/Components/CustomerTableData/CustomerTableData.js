import React, { useState } from "react";
import CustomModel from "../CustomModel/CustomModel";
import { useDispatch } from "react-redux";
import NewBtnDivs from "../ButtonsDiv/NewBtnDivs";
import { fetchLanguage, updatelanguages } from "../../Database/realtimedb";
import { setLanguages } from "../../store/projectSlice";

function CustomerTableData({ id, english, french, spain, german, italian }) {
	const dispatch = useDispatch();
	const [show, setShow] = useState(false);
	const [formdata, setformdata] = useState({
		english: english,
		french: french,
		spain: spain,
		german: german,
		italy: italian,
	});
	const fetchdata = () => {
		fetchLanguage().then((languages) => {
			let resultarry = Object.keys(languages).map((dat, index) => {
				return { id: dat, ...Object.values(languages)[index] };
			});
			dispatch(setLanguages({ languages: resultarry }));
		});
	};
	const UpdateLanguagfun = async (e) => {
		e.preventDefault();
		const result = await updatelanguages(id, formdata);
		if (result?.msg !== "") {
			fetchdata();
			setShow(false);
			alert("Updated Successfully");
		} else {
			alert("internal server error");
		}
	};
	return (
		<>
			<tr key={id}>
				<td>{id}</td>
				<td>{english}</td>
				<td>{french}</td>
				<td>{spain}</td>
				<td>{german}</td>
				<td>{italian}</td>
				<td>
					<NewBtnDivs morefunct={() => setShow(!show)} />
				</td>
			</tr>
			<CustomModel showModel={show} toggleModel={() => setShow(!show)}>
				<form onSubmit={UpdateLanguagfun} className='languagesEditor'>
					<span>English</span>
					<textarea
						value={formdata?.english}
						onChange={(e) =>
							setformdata({ ...formdata, english: e.target.value })
						}
						placeholder='English text'
					/>
					<span>Spanish</span>
					<textarea
						value={formdata?.spain}
						onChange={(e) =>
							setformdata({ ...formdata, spain: e.target.value })
						}
						placeholder='Spanish text'
					/>
					<span>French</span>
					<textarea
						value={formdata?.french}
						onChange={(e) =>
							setformdata({ ...formdata, french: e.target.value })
						}
						placeholder='French text'
					/>
					<span>German</span>
					<textarea
						value={formdata?.german}
						onChange={(e) =>
							setformdata({ ...formdata, german: e.target.value })
						}
						placeholder='German text'
					/>
					<span>Italy</span>
					<textarea
						value={formdata?.italy}
						onChange={(e) =>
							setformdata({ ...formdata, italy: e.target.value })
						}
						placeholder='Italian text'
					/>
					<button type='submit'>Update</button>
				</form>
			</CustomModel>
		</>
	);
}

export default CustomerTableData;
