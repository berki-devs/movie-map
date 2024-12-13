import Axios from "axios";

const API_KEY = import.meta.env.VITE_KINOPOISK_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";

export const fetchMovieById = async (id) => {
	const response = await fetch(`${BASE_URL}?i=${id}&apikey=${API_KEY}`);
	const data = await response.json();
	return data;
};

export const fetchMovieByTitle = async (searchString) => {
	const url = `${BASE_URL}?s=${searchString}&apikey=${API_KEY}`;
	const response = await Axios.get(url);
	console.log(response);
	if (response.data.Search) {
		return response.data.Search;
	}
	return [];
};
