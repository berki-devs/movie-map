import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchMovieById } from "../../api";
import { Box, Grid2, Typography } from "@mui/material";

const Details = () => {
	const { id } = useParams();
	const [movie, setMovie] = useState(null);

	useEffect(() => {
		const getMovie = async (id) => {
			const movieData = await fetchMovieById(id);
			setMovie(movieData);
		};

		getMovie(id);
	}, [id]);

	return (
		<>
			{movie && (
				<Grid2
					container
					className="flex max-lg:flex-col max-lg:justify-center items-center justify-between w-full"
					columnSpacing={10}
				>
					<Grid2>
						<img src={movie.Poster} alt={movie.Title} loading="lazy" />
					</Grid2>
					<Grid2 className="max-lg:mt-5">
						<Box className="max-w-[600px]">
							<Typography variant="h5">
								{movie.Title} {`(${movie.Type} ${movie.Year})`}
							</Typography>
							<Typography variant="subtitle2">{movie.Rated}</Typography>
							<Typography className="w-fit" variant="body1">
								{movie.Plot}
							</Typography>
						</Box>
						<div className="grid gap-4 mt-5">
							<div className="text-lg">{`About ${movie.Type}`}</div>
							<div className="grid gap-4 w-full max-sm:text-sm">
								<div className="flex justify-between">
									<span className="text-gray-600">Year of production</span>
									<>{movie.Released}</>
								</div>
								<div className="flex justify-between">
									<span className="text-gray-600">Country</span>
									<>{movie.Country}</>
								</div>
								<div className="flex justify-between">
									<span className="text-gray-600">Director</span>
									<>{movie.Director}</>
								</div>
								<div className="flex justify-between">
									<span className="text-gray-600">Writer</span>
									<>{movie.Writer}</>
								</div>
								<div className="flex justify-between">
									<span className="text-gray-600">Actors</span>
									<>{movie.Actors}</>
								</div>
								<div className="flex justify-between">
									<span className="text-gray-600">IMDb Rating</span>
									<>{movie.imdbRating}</>
								</div>
								<div className="flex justify-between">
									<span className="text-gray-600">Runtime</span>
									<>{movie.Runtime}</>
								</div>
							</div>
						</div>
					</Grid2>
				</Grid2>
			)}
		</>
	);
};

export default Details;
