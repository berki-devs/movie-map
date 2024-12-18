import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';

const movieTypes = [
  { title: 'Movie', value: 'movie' },
  { title: 'Series', value: 'series' },
  { title: 'Episode', value: 'episode' },
];

const Filters = ({
  searchTitle,
  setSearchTitle,
  movieYear,
  setMovieYear,
  movieType,
  setMovieType,
}) => {
  const currentDate = format(new Date(), 'yyyy-MM-dd');

  const [cleared, setCleared] = useState();

  useEffect(() => {
    if (cleared) {
      setMovieYear('');
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [setMovieYear, cleared]);

  return (
    <Paper elevation={1}>
      <Box className="flex items-baseline gap-5 p-4">
        <TextField
          type="text"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          label="Search for a movie"
          variant="outlined"
        />

        <FormControl className="w-60">
          <InputLabel id="select-type-label">Select movie type</InputLabel>
          <Select
            labelId="select-type-label"
            id="select-type"
            label="Select movie type"
            value={movieType}
            onChange={(event) => setMovieType(event.target.value)}
          >
            {movieTypes.map((type) => (
              <MenuItem key={type.value} value={type.value}>
                {type.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Select year of release"
            maxDate={new Date(currentDate)}
            openTo="year"
            views={['year']}
            value={movieYear ? new Date(movieYear) : undefined}
            closeOnSelect
            slotProps={{
              field: {
                clearable: true,
                onClear: () => {
                  setCleared(true);
                },
              },
            }}
            yearsOrder="desc"
            onChange={(date) => setMovieYear(format(date, 'yyyy.MM.dd'))}
            sx={{ minWidth: 250 }}
          />
        </LocalizationProvider>
      </Box>
    </Paper>
  );
};

export default Filters;
