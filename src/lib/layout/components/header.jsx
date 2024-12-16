import { Link as Route, useLocation } from 'react-router';
import { routes } from '../../router/routes';
import { Box, Link } from '@mui/material';

const Header = () => {
  const location = useLocation();
  const searchParams = location.search;

  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      justifyContent={'space-between'}
      px={10}
      py={5}
    >
      <Box fontSize={20}>
        <Link
          color="black"
          underline="hover"
          component={Route}
          to={{ pathname: '/', search: searchParams }}
        >
          MovieMap
        </Link>
      </Box>
      <Box className="flex items-center gap-5">
        {routes.slice(0, -1).map((item) => (
          <Link
            className="text-black decoration-black"
            component={Route}
            key={item.path}
            to={{ pathname: item.path, search: searchParams }}
          >
            {item.name}
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default Header;
