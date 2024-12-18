import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';

import {
  Grid2,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  IconButton,
} from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';

const Featured = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSearchTitle = queryParams.get('title') || '';
  const initialSearchType = queryParams.get('type') || '';
  const initialSearchYear = queryParams.get('year') || '';
  const initialSearchPage = queryParams.get('page') || '';

  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const oldFeatured = JSON.parse(localStorage.getItem('Featured')) || [];
    setFeatured(oldFeatured);
  }, []);

  const saveToLocal = (items) => {
    localStorage.setItem('Featured', JSON.stringify(items));
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
      <Typography variant="h5">Featured Movies</Typography>

      <Grid2
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 2, sm: 8, md: 12 }}
        mt={5}
      >
        {featured.map((movie) => (
          <Grid2
            key={movie.imdbID}
            bgcolor={'bisque'}
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
                  {movie.Title}{' '}
                  <span className="text-sm text-gray-500">({movie.Year})</span>
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton onClick={() => removeFeaturedMovie(movie)}>
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
                  to={`/details/${movie.imdbID}/?title=${initialSearchTitle}&type=${initialSearchType}&year=${initialSearchYear}&page=${initialSearchPage}`}
                  size="small"
                >
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </div>
  );
};

export default Featured;
