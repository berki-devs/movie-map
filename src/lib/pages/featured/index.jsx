import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";

const Featured = () => {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const initialSearchTitle = queryParams.get("title") || "";

	const [featured, setFeatured] = useState([]);

	useEffect(() => {
		const oldFeatured = JSON.parse(localStorage.getItem("Featured")) || [];
		setFeatured(oldFeatured);
	}, []);

	const saveToLocal = (items) => {
		localStorage.setItem("Featured", JSON.stringify(items));
	};

	const removeFeaturedMovie = (movie) => {
		const newFeatured = featured.filter(
			(featuredMovie) => featuredMovie.imdbID !== movie.imdbID,
		);
		setFeatured(newFeatured);
		saveToLocal(newFeatured);
	};

	return (
		<div>
			<h1 className="text-xl px-3 sm:px-10">Featured Movies</h1>
			<div className="flex flex-wrap justify-center lg:justify-start gap-5 mt-5">
				{featured.map((movie) => (
					<div
						className="rounded-lg border bg-white overflow-hidden shadow-sm"
						key={movie.imdbID}
					>
						<div className="px-0 pt-0 pb-2">
							<img
								src={movie.Poster}
								className="md:w-[315px]"
								alt={movie.Title}
							/>
							<div className="px-4 pt-2">
								<div className="text-lg">{movie.Title}</div>
								<div className="flex items-center justify-between w-full">
									<Link
										className="px-4 py-1.5 border rounded-md"
										to={`/details/${movie.imdbID}/?title=${initialSearchTitle}`}
									>
										View Details
									</Link>
									<button
										className="p-4"
										type="button"
										onClick={() => removeFeaturedMovie(movie)}
									>
										{!featured.some(
											(featuredMovie) => featuredMovie.imdbID === movie.imdbID,
										) ? (
											<HeartIcon color="gray" className="scale-150" />
										) : (
											<HeartFilledIcon color="red" className="scale-150" />
										)}
									</button>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Featured;
