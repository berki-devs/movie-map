import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";

import { useDebounce } from "use-debounce";
import { fetchMovieByTitle } from "../../api";
import {
	Box,
	Grid2,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Typography,
	IconButton,
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import Filters from "./components/filters";
import { getYear } from "date-fns";

const Home = () => {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);

	const navigate = useNavigate();

	const initialSearchTitle = queryParams.get("title") || "";
	const initialSearchType = queryParams.get("type") || "";
	const initialSearchYear = queryParams.get("year") || "";

	const [searchTitle, setSearchTitle] = useState(initialSearchTitle);
	const [debouncedSearchTitle] = useDebounce(searchTitle, 300);
	const [movieType, setMovieType] = useState(initialSearchType || "");
	const [movieYear, setMovieYear] = useState(initialSearchYear || "");

	const [movies, setMovies] = useState([]);
	const [featured, setFeatured] = useState([]);

	useEffect(() => {
		const fetchMovies = async () => {
			if (debouncedSearchTitle.trim() === "") {
				setMovieType("");
				setMovieYear("");
				setMovies([]);
				navigate("/");
				return;
			}

			let fetchedMovies = [];

			if (debouncedSearchTitle.trim() !== "") {
				fetchedMovies = await fetchMovieByTitle(
					debouncedSearchTitle,
					movieType,
					getYear(new Date(movieYear)),
				);
			} else if (movieType) {
				fetchedMovies = await fetchMovies(movieType, movieYear);
			}

			setMovies(fetchedMovies);
			navigate(
				`/?title=${debouncedSearchTitle}&type=${movieType}&year=${movieYear}`,
			);
		};

		fetchMovies();
	}, [debouncedSearchTitle, movieType, movieYear, navigate]);

	useEffect(() => {
		const movieFeatured = JSON.parse(localStorage.getItem("Featured"));
		if (movieFeatured) {
			setFeatured(movieFeatured);
		}
	}, []);

	const saveToLocal = (items) => {
		if (items.length < 10) {
			localStorage.setItem("Featured", JSON.stringify(items));
		} else {
			alert("You have reached the maximum number of featured");
			navigate("/featured");
		}
	};

	const nominateMovie = (movie) => {
		if (
			featured.some((featuredMovie) => featuredMovie.imdbID === movie.imdbID)
		) {
			const newFeatured = featured.filter(
				(featuredMovie) => featuredMovie.imdbID !== movie.imdbID,
			);
			setFeatured(newFeatured);
			saveToLocal(newFeatured);
		} else {
			const newFeatured = [...featured, movie];
			setFeatured(newFeatured);
			saveToLocal(newFeatured);
		}
	};

	return (
		<Box>
			<Filters
				searchTitle={searchTitle}
				setSearchTitle={setSearchTitle}
				movieYear={movieYear}
				setMovieYear={setMovieYear}
				movieType={movieType}
				setMovieType={setMovieType}
			/>
			<Grid2
				container
				spacing={{ xs: 2, md: 3 }}
				columns={{ xs: 2, sm: 8, md: 12 }}
				mt={5}
			>
				{movies.map((movie) => (
					<Grid2
						key={movie.imdbID}
						bgcolor={"bisque"}
						className="h-[600px] md:ah-[550px] lg:h-[700px]"
						size={{ xs: 2, sm: 4, md: 4 }}
					>
						<Card className="flex flex-col w-full h-full">
							<CardMedia
								image={movie.Poster}
								className="flex-grow"
								title={movie.Title}
							/>
							<CardContent>
								<Typography gutterBottom variant="h6" component="div">
									{movie.Title}{" "}
									<span className="text-sm text-gray-500">({movie.Year})</span>
								</Typography>
							</CardContent>
							<CardActions>
								<IconButton onClick={() => nominateMovie(movie)}>
									{!featured.some(
										(featuredMovie) => featuredMovie.imdbID === movie.imdbID,
									) ? (
										<FavoriteBorder />
									) : (
										<Favorite color="error" />
									)}
								</IconButton>
								<Button
									LinkComponent={Link}
									to={`/details/${movie.imdbID}/?title=${searchTitle}&type=${movieType}&year=${movieYear}`}
									size="small"
								>
									Learn More
								</Button>
							</CardActions>
						</Card>
					</Grid2>
				))}
			</Grid2>
		</Box>
	);
};

export default Home;
