import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	orders: [],
	metalCards: [],
	products: [],
	clubs: [],
	languages: [],
	banner: null,
};

export const projectSlice = createSlice({
	name: "project",
	initialState,
	reducers: {
		setOrders: (state, action) => {
			if (action.payload.orders === null) {
				state.orders = [];
			} else {
				state.orders = action.payload.orders;
			}
		},
		setMetalCards: (state, action) => {
			if (action.payload.metalCards === null) {
				state.metalCards = [];
			} else {
				state.metalCards = action.payload.metalCards;
			}
		},
		setProducts: (state, action) => {
			if (action.payload.products === null) {
				state.products = [];
			} else {
				state.products = action.payload.products;
			}
		},
		setClubs: (state, action) => {
			if (action.payload.clubs === null) {
				state.clubs = [];
			} else {
				state.clubs = action.payload.clubs;
			}
		},
		setLanguages: (state, action) => {
			if (action.payload.languages === null) {
				state.languages = [];
			} else {
				state.languages = action.payload.languages;
			}
		},
		setBanner: (state, action) => {
			if (action.payload.banner === null) {
				state.banner = null;
			} else {
				state.banner = action.payload.banner;
			}
		},
	},
});

export const {
	setOrders,
	setClubs,
	setMetalCards,
	setProducts,
	setBanner,
	setLanguages,
} = projectSlice.actions;

export default projectSlice.reducer;
