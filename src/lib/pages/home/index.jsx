import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useDebounce } from 'use-debounce';
import { fetchMovieByTitle } from '../../api';
import { HeartFilledIcon, HeartIcon } from '@radix-ui/react-icons';

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialSearchTitle = queryParams.get('title') || '';

  const [movies, setMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState(initialSearchTitle);
  const [debouncedSearchTitle] = useDebounce(searchTitle, 1000);
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    if (debouncedSearchTitle.trim() === '') {
      setMovies([]);
      navigate('/');
      return;
    }
    const fetchMovies = async () => {
      const fetchedMovies = await fetchMovieByTitle(debouncedSearchTitle);
      setMovies(fetchedMovies);
      navigate(`/?title=${debouncedSearchTitle}`);
    };
    fetchMovies();
  }, [debouncedSearchTitle, navigate]);

  useEffect(() => {
    const movieFeatured = JSON.parse(localStorage.getItem('Featured'));
    if (movieFeatured) {
      setFeatured(movieFeatured);
    }
  }, []);

  const saveToLocal = (items) => {
    if (items.length < 10) {
      localStorage.setItem('Featured', JSON.stringify(items));
    } else {
      alert('You have reached the maximum number of featured');
      navigate('/featured');
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
    <div>
      <div className="mx-3 sm:mx-10 lg:mx-0 rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="p-6">
          <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-gray-500">
            <input
              type="text"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              placeholder="Search for a movie..."
              className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center lg:justify-start gap-5 mt-5">
        {movies.map((movie) => (
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
                    to={`/details/${movie.imdbID}/?title=${searchTitle}`}
                  >
                    View Details
                  </Link>
                  <button
                    className="p-4"
                    type="button"
                    onClick={() => nominateMovie(movie)}
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

export default Home;
