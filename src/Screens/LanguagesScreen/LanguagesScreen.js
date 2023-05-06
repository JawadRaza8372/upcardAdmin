import React from "react";
import { useSelector } from "react-redux";
import CustomerTableData from "../../Components/CustomerTableData/CustomerTableData";
import "./LanguagesScreen.scss";
const LanguagesScreen = () => {
	const { languages } = useSelector((state) => state.project);

	return (
		<div className='languagesContainer'>
			<h1>Languages</h1>
			<table>
				<tr>
					<th>Key</th>
					<th>English</th>
					<th>French</th>
					<th>Spain</th>
					<th>German</th>
					<th>Italian</th>
					<th>Action</th>
				</tr>
				{languages &&
					languages?.map((dat) => (
						<CustomerTableData
							id={dat?.id}
							english={dat?.english}
							french={dat?.french}
							spain={dat?.spain}
							german={dat?.german}
							italian={dat?.italy}
						/>
					))}
			</table>
		</div>
	);
};

export default LanguagesScreen;
