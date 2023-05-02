import { initializeApp } from "firebase/app";
import {
	getFirestore,
	collection,
	getDocs,
	addDoc,
	deleteDoc,
	doc,
} from "firebase/firestore";

var FirebaseConfig = {
	apiKey: "AIzaSyCRgDbNA14WDc6O3oIXZsElpldIZjdHdrs",
	authDomain: "upcard-eb05d.firebaseapp.com",
	databaseURL: "https://upcard-eb05d-default-rtdb.firebaseio.com",
	projectId: "upcard-eb05d",
	storageBucket: "upcard-eb05d.appspot.com",
	messagingSenderId: "84482438842",
	appId: "1:84482438842:web:8fce22f1936c439feaf483",
	measurementId: "G-THMDWDSY3K",
};
initializeApp(FirebaseConfig);
const dbs = getFirestore();
const uploadImage = async (image) => {
	const data = new FormData();
	data.append("file", image);
	data.append("upload_preset", "jhcjvtsx");
	data.append("cloud_name", "dxb services");
	const result = await fetch(
		"  https://api.cloudinary.com/v1_1/dpjk8xcld/image/upload",
		{
			method: "post",
			body: data,
		}
	);
	return result?.json();
};

const getData = async (collectionName) => {
	const projectSnaps = await getDocs(collection(dbs, `${collectionName}`));
	const projectlist = projectSnaps.docs.map((doc) => {
		return { id: doc?.id, data: doc.data() };
	});
	return projectlist;
};

const postData = async (data, collectionName) => {
	const docRef = await addDoc(collection(dbs, `${collectionName}`), {
		...data,
	});
	if (docRef) {
		return { data: docRef?.id, msg: null };
	} else {
		return { data: null, msg: "Data can not be posted." };
	}
};
const DeletData = async (dataid, collectionName) => {
	const docRef = await deleteDoc(doc(dbs, `${collectionName}`, dataid));
	if (docRef) {
		return { data: "success", msg: null };
	} else {
		return { data: null, msg: "Data can not be posted." };
	}
};
export { uploadImage, getData, postData, dbs, DeletData };
