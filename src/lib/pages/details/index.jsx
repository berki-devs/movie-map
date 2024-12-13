import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchMovieById } from "../../api";

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

	console.log(movie);
	return (
		<div>
			{movie && (
				<div className="md:flex justify-between gap-5 w-full max-lg:p-10">
					<img src={movie.Poster} className="max-md:w-full" alt={movie.Title} />
					<div className="w-full md:max-w-[650px] max-md:mt-10">
						<div>
							<span className="text-2xl md:text-lg font-medium">
								{movie.Title} {`(${movie.Type} ${movie.Year})`}
							</span>
							<p className="text-gray-600 text-sm">{movie.Rated}</p>
							<p>{movie.Plot}</p>
						</div>
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
					</div>
				</div>
			)}
		</div>
	);
};

export default Details;
