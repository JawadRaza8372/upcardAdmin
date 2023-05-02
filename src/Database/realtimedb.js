import {
	getDatabase,
	ref,
	child,
	get,
	set,
	remove,
	push,
} from "firebase/database";
const fetchOtherProducts = async () => {
	const result = await get(child(ref(getDatabase()), "/Products"));
	let finaldata = result?.val();
	return finaldata;
};
const fetchLanguage = async () => {
	const result = await get(child(ref(getDatabase()), "/languages"));
	let finaldata = result?.val();
	return finaldata;
};
const fetchMetalCards = async () => {
	const result = await get(child(ref(getDatabase()), "/metalCards"));
	let finaldata = result?.val();
	return finaldata;
};
const fetchClubs = async () => {
	const result = await get(child(ref(getDatabase()), "/FootballClubs"));
	let finaldata = result?.val();
	return finaldata;
};
const updateOtherProducts = async (id, data) => {
	let result = { msg: "", error: "" };
	await set(ref(getDatabase(), "/Products/" + id), {
		...data,
	})
		.then(() => {
			result = { msg: "sucess", error: "" };
		})
		.catch((e) => {
			result = { msg: "", error: "internal server Error" };
		});
	return result;
};
const delOtherProducts = async (id) => {
	let result = { msg: "", error: "" };
	await remove(ref(getDatabase(), "/Products/" + id))
		.then(() => {
			result = { msg: "sucess", error: "" };
		})
		.catch((e) => {
			result = { msg: "", error: "internal server Error" };
		});
	return result;
};
const updateMetalCards = async (id, data) => {
	let result = { msg: "", error: "" };
	await set(ref(getDatabase(), "/metalCards/" + id), {
		...data,
	})
		.then(() => {
			result = { msg: "sucess", error: "" };
		})
		.catch((e) => {
			result = { msg: "", error: "internal server Error" };
		});
	return result;
};
const delMetalCards = async (id) => {
	let result = { msg: "", error: "" };
	await remove(ref(getDatabase(), "/metalCards/" + id))
		.then(() => {
			result = { msg: "sucess", error: "" };
		})
		.catch((e) => {
			result = { msg: "", error: "internal server Error" };
		});
	return result;
};
const updatelanguages = async (id, data) => {
	let result = { msg: "", error: "" };
	await set(ref(getDatabase(), "/languages/" + id), {
		...data,
	})
		.then(() => {
			result = { msg: "sucess", error: "" };
		})
		.catch((e) => {
			result = { msg: "", error: "internal server Error" };
		});
	return result;
};
const updateClubs = async (id, data) => {
	let result = { msg: "", error: "" };
	await set(ref(getDatabase(), "/FootballClubs/" + id), {
		...data,
	})
		.then(() => {
			result = { msg: "sucess", error: "" };
		})
		.catch((e) => {
			result = { msg: "", error: "internal server Error" };
		});
	return result;
};
const delClubs = async (id) => {
	let result = { msg: "", error: "" };
	await remove(ref(getDatabase(), "/FootballClubs/" + id))
		.then(() => {
			result = { msg: "sucess", error: "" };
		})
		.catch((e) => {
			result = { msg: "", error: "internal server Error" };
		});
	return result;
};
const addCards = async (data) => {
	let result = { msg: "", error: "" };
	await push(ref(getDatabase(), "/metalCards"), { ...data })
		.then(() => {
			result = { msg: "sucess", error: "" };
		})
		.catch((e) => {
			result = { msg: "", error: "internal server Error" };
		});
	return result;
};
const addClubs = async (data) => {
	let result = { msg: "", error: "" };
	await push(ref(getDatabase(), "/FootballClubs"), { ...data })
		.then(() => {
			result = { msg: "sucess", error: "" };
		})
		.catch((e) => {
			result = { msg: "", error: "internal server Error" };
		});
	return result;
};
const addotherprod = async (data) => {
	let result = { msg: "", error: "" };
	await push(ref(getDatabase(), "/Products"), { ...data })
		.then(() => {
			result = { msg: "sucess", error: "" };
		})
		.catch((e) => {
			result = { msg: "", error: "internal server Error" };
		});
	return result;
};
export {
	fetchClubs,
	fetchMetalCards,
	fetchOtherProducts,
	delOtherProducts,
	updateOtherProducts,
	updateMetalCards,
	delMetalCards,
	updateClubs,
	delClubs,
	addCards,
	addClubs,
	addotherprod,
	fetchLanguage,
	updatelanguages,
};
